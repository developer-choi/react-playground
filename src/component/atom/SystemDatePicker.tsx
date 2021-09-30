import React, {PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';
import {absoluteAllZero} from '@util/style/css';
import InputDate, {InputDateProp} from '@component/extend/InputDate';

export default function SystemDatePicker({children, ...rest}: PropsWithChildren<InputDateProp>) {
  
  return (
      <Label>
        {children}
        {/* required를 추가한 이유는, 휴대폰같은 디바이스에서 모바일웹브라우저로 접속했을 때 clear button을 숨기기위해서.  */}
        <Input required {...rest}/>
      </Label>
  );
}

const Label = styled.label`
  position: relative;
  display: inline-flex;
`;

const absoluteFull = css`
  ${absoluteAllZero};
  width: 100%;
  height: 100%;
`;

const Input = styled(InputDate)`
  ${absoluteFull}; //SystemDatePicker컴포넌트 자식으로 오는 요소의 크기에 맞게 늘어나도록 하기위함
  -webkit-appearance: none; //모바일 환경에서 세모아이콘 (방향아이콘) 지우기
  opacity: 0; //연도 월 일 텍스트 지우기 && 연도 월 일 텍스트에 드래그되는거 지우기
  
  ::-webkit-calendar-picker-indicator {
    ${absoluteFull}; //SystemDatePicker컴포넌트 자식으로 오는 요소의 크기에 맞게 늘어나도록 하기위함
    margin: 0; //브라우저 기본스타일 초기화. 기본 달력아이콘과 연도 월 일 사이에 마진값을 초기화.
    background-image: none; //브라우저 기본 달력아이콘 지우기
  }
  ::-webkit-inner-spin-button {
    display: none; //모바일 환경에서 세모아이콘 (방향아이콘) 지우기
    -webkit-appearance: none; //모바일 환경에서 세모아이콘 (방향아이콘) 지우기
  }
`;
