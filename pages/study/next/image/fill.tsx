import React from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

/** Flow
 * 브라우저 가로길이를 줄여보면,
 *
 * (1) 위의 이미지가 crop되는것을 볼 수 있다.
 * (2) 아래 이미지는 width height를 삭제하라는 경고만뜨고 이미지 비율깨진다.
 *
 * 그래서, layout fill은 object-fit하고 같이써야하는 경우 외에 쓰임새가 있는지 잘 모르겠다.
 * 일단 parent element에 반드시 position relative를 선언해야하긴해서,
 *
 * (3) 단독으로 width height를 선언하면 오히려 버그남. 아래 주석처리된거 풀면 난리남. 반드시 parent element도 필요하고 relative도 필요함.
 */

//http://localhost:3000/study/next/image/fill
export default function Page() {
  return (
    <WrapperChildBorder>
      <StandardFillWrapper>
        <Image src={EXTERNAL_IMAGE_URL} alt="ALT" layout="fill" priority/>
      </StandardFillWrapper>
      <WrongFillWrapper>
        <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="fill"/>
      </WrongFillWrapper>
      {/*<Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="fill" priority/>*/}
    </WrapperChildBorder>
  );
}

// 268/177가 원본 비율
export const EXTERNAL_IMAGE_URL = 'https://picsum.photos/536/354';

export const WrapperChildBorder = styled.div`
  height: 100%;
  
  > * {
    border: 5px solid red !important;
  }
`;

const sizeCss = css`
  width: 90%;
  height: 90%;
  max-width: 800px;
  max-height: 600px;
`;

const StandardFillWrapper = styled.div`
  ${sizeCss};
  position: relative;
  
  img {
    object-fit: cover;
  }
`;
const WrongFillWrapper = styled.div`
  ${sizeCss};
  position: relative;
`;
