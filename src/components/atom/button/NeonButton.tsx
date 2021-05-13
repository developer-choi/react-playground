import styled, {keyframes} from 'styled-components';
import React, {ComponentProps, forwardRef, Ref} from 'react';
import ButtonExtend from '@components/atom/button/ButtonExtend';

export default forwardRef(function NeonButton(props: ComponentProps<'button'>, ref: Ref<HTMLButtonElement>) {
  
  return (
      <Wrap ref={ref} {...props}>
        <MoveInTop/>
        <MoveInRight/>
        <MoveInBottom/>
        <MoveInLeft/>
        <ButtonText>HOVER ME</ButtonText>
      </Wrap>
  );
});

const ButtonText = styled.span`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const SETTINGS = {
  borderWidth: 2,
  borderColor: '#04caf4',
  sideDuration: 1 //각 변당 이동시간. 곱하기 4하면 한바퀴도는시간
};

/*
0초에 top보더가 보이기 시작.

0.25초에 top 보더가 오른쪽 끝 도달.
0.25초에 right 보더가 보이기 시작.

0.5초에 top보더 사라짐.
0.5초에 right보더가 아래 끝 도달.

0.5초에 bottom보더가 보이기 시작.

0.75초에 bottom보더가 왼쪽 끝 도달.
0.75 초에 left보더가 보이기 시작.

1초에 left보더 도착 및 0초내용과 반복.
*/
const horizontalAnimate = keyframes`
  0% {
    left: -100%;
  }
  
  50%, 100% {
    left: 100%;
  }
`;

const verticalAnimate = keyframes`
  0% {
    top: -100%;
  }
  
  50%, 100% {
    top: 100%;
  }
`;

const MoveInTop = styled.span`
  top: 0;
  width: 100%;
  height: ${SETTINGS.borderWidth}px;
  background: linear-gradient(90deg, transparent, ${SETTINGS.borderColor});
  animation: ${horizontalAnimate} ${SETTINGS.sideDuration}s infinite linear;
`;
const MoveInRight = styled.span`
  top: -100%;
  right: 0;
  width: ${SETTINGS.borderWidth}px;
  height: 100%;
  background: linear-gradient(transparent, ${SETTINGS.borderColor});
  animation: ${verticalAnimate} ${SETTINGS.sideDuration}s infinite linear ${SETTINGS.sideDuration / 4}s;
`;
const MoveInBottom = styled.span`
  left: 100%;
  bottom: 0;
  width: 100%;
  height: ${SETTINGS.borderWidth}px;
  background: linear-gradient(270deg, transparent, ${SETTINGS.borderColor});
  animation: ${horizontalAnimate} ${SETTINGS.sideDuration}s infinite reverse linear;
`;
const MoveInLeft = styled.span`
  top: -100%;
  left: 0;
  width: ${SETTINGS.borderWidth}px;
  height: 100%;
  background: linear-gradient(0deg, transparent, ${SETTINGS.borderColor});
  animation: ${verticalAnimate} ${SETTINGS.sideDuration}s reverse infinite linear ${SETTINGS.sideDuration / 4}s;
`;

const Wrap = styled(ButtonExtend)`
  position: relative;
  padding: 20px 40px;
  overflow: hidden;
  color: #04caf4;
  cursor: pointer;
  
  :hover {
    background: #04caf4;
    color: black;
    box-shadow: 0 0 5px #04caf4,
    0 0 25px #04caf4,
    0 0 50px #04caf4,
    0 0 200px #04caf4;
  }
  
  > :not(${ButtonText}) {
    position: absolute;
  }
`;
