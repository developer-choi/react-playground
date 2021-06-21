import React, {forwardRef, Ref} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import CheckBoxExtend, {CheckBoxExtendProps} from '@components/extend/CheckBoxExtend';

export interface BasicCheckBoxProp extends CheckBoxExtendProps {
  label?: string;
}

export default forwardRef(function BasicCheckBox({className, label, checked, ...rest}: BasicCheckBoxProp, ref: Ref<HTMLInputElement>) {

  return (
      <Wrap className={classNames({active: checked}, className)}>
        <Input className="check-box" ref={ref} checked={checked} {...rest}/>
        {label && <LabelText className="label-text">{label}</LabelText>}
      </Wrap>
  );
});

const Wrap = styled.label`
  
  position: relative;
  overflow: hidden;
  min-width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  
  &.active:after {
    background-color: green;
  }
  
  &:after {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 0;
    top: 1px;
    border: 1px solid lightgray;
    content: '';
    border-radius: 10%;
    background-color: white;
  }
`;

const Input = styled(CheckBoxExtend)`
  position: absolute;
  width: 1px;
  height: 1px;
  left: -1px;
`;

const LabelText = styled.span`
  padding-left: 23px;
`;

/*
const StyledCheckBox = styled(BasicCheckBox)`

  //체크X -- 체크박스 부분
  &:after {
  }

  //체크X -- 텍스트 부분
  > .label-text {
  }

  //체크O -- 체크박스 부분
  &.active:after {
  }

  //체크O -- 텍스트 부분
  &.active > .label-text {
  }
`;
*/
