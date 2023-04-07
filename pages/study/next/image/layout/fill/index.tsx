import React from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

/** Flow
 * 브라우저 가로길이를 줄여보면,
 * 위의 이미지가 crop되는것을 볼 수 있다.
 *
 * objectFit은, wrapper에 > img로 적용하지않고,
 * Image props에 objectFit이 있으니 이걸 활용하자.
 */

//http://localhost:3000/study/next/image/layout/fill
export default function Page() {
  return (
    <WrapperChildBorder>
      <StandardFillWrapper>
        <Image src={EXTERNAL_IMAGE_URL} alt="ALT" layout="fill" objectFit="cover"/>
      </StandardFillWrapper>
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
`;
