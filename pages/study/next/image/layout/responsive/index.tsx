import React from "react";
import Image from "next/image";
import {EXTERNAL_IMAGE_URL, WrapperChildBorder} from '@pages/study/next/image/layout/fill';
import styled from 'styled-components';

/** Flow (맨밑 styled-components > max 500px, min 300px로 설정)
 * 이미지 슬라이드에서 사용한다 가정하고 예제를 만들었고, 요구조건은 다음과같음.
 * 1. 가로길이 줄어들면 이미지가 비율에맞게줄어들되 가로세로로 홀쭉해지면안됨.
 * 2. 컨테이너 사이즈와 이미지사이즈의 비율이 항상 같아야함. 보통 SwiperSlide 안에 위에 상품이미지나오고 아래에 상품정보 나오니까.
 *
 * (1) 브라우저 가로길이가 500px 이상일 경우
 * 정상 > 1. Wrapper 있는곳은 최대크기 500px까지만 늘어남.
 * 오류 > 2. Wrapper 없는곳은 최대크기 지정할만한 방법이 없어보여서 최대로늘어남.
 *
 * (2) 브라우저 가로길이가 500px ==> 300px로 줄일 경우
 * 정상 > 1, 2 모두 컨테이너 사이즈에 맞게 줄어듬.
 * 오류 > 3은 컨테이너사이즈와 이미지 사이즈가 서로 안맞게됨. (height 100%로 잡혀있고 브라우저 가로길이만 줄어들고있어서 이런버그생김)
 *
 * (3) 브라우저 가로길이가 300px 미만으로 줄어들경우
 * 정상 > 1은 최소길이 300px를 가지고 더 안줄어듬.
 * 오...류...까지는아닌듯 > 2는 최소길이 300px보다 더 줄어듬. (브라우저 가로길이 10px이면 10px까지 엄청작게 줄어들예정)
 * 오류 > 3은 뭐 원래 기대도안했음;
 */

//http://localhost:3000/study/next/image/responsive
export default function Page() {
  return (
    <WrapperChildBorder>
      <SizeWrapper>
        <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="responsive" priority/>
      </SizeWrapper>

      <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="responsive"/>

      <WrongWrapper>
        <Image width={400} height={400} src={EXTERNAL_IMAGE_URL} alt="ALT" layout="responsive"/>
      </WrongWrapper>
    </WrapperChildBorder>
  );
}

const SizeWrapper = styled.div`
  min-width: 300px;
  width: 100%;
  max-width: 500px;
`;

const WrongWrapper = styled(SizeWrapper)`
  min-height: 300px;
  height: 100%; //이부분이 제일문제
  max-height: 500px;
`;
