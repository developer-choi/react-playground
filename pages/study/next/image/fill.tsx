import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

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
    <>
      <FillWrapper>
        <Image src={URL} alt="ALT" layout="fill" priority/>
      </FillWrapper>
      <FillWrapper2>
        <Image width={400} height={400} src={URL} alt="ALT" layout="fill" priority/>
      </FillWrapper2>
      {/*<Image width={400} height={400} src={URL} alt="ALT" layout="fill" priority/>*/}
    </>
  );
}

const URL = 'https://picsum.photos/536/354';

export const ImageLayoutWrapper = styled.div`
  width: 90%;
  height: 90%;
  max-width: 800px;
  max-height: 600px;
  border: 5px solid red;
`;

const FillWrapper = styled(ImageLayoutWrapper)`
  position: relative;
  
  img {
    object-fit: cover;
  }
`;
const FillWrapper2 = styled(ImageLayoutWrapper)`
  position: relative;
`;
