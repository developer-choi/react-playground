import React, {ChangeEvent, PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';
import {destructDate} from '../../utils/web-api-extend/date/date-util';

export interface SystemDatePickerProps {
  value: Date;
  onChangeDate: (value: Date) => void;
}

export function SystemDatePicker({children, onChangeDate, value}: PropsWithChildren<SystemDatePickerProps>) {
  
  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeDate(new Date(event.target.value));
  }, [onChangeDate]);
  
  const {year, month, date} = destructDate(value);
  
  return (
      <Label>
        {children}
        <Input type="date" value={`${year}-${datePadZero(month)}-${datePadZero(date)}`} onChange={onChange}/>
      </Label>
  );
}

function datePadZero(value: number) {
  return value.toString().padStart(2, '0');
}

const Label = styled.label`
  position: relative;
  display: inline-flex;
`;

const absoluteFull = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  ${absoluteFull}; //SystemDatePicker컴포넌트 자식으로 오는 요소의 크기에 맞게 늘어나도록 하기위함
  font-size: 0; //연도 월 일 텍스트 지우기
  -webkit-appearance: none; //모바일 환경에서 세모아이콘 (방향아이콘) 지우기
  
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
