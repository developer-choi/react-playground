import React, {CSSProperties, useCallback, useState} from 'react';
import styled from 'styled-components';
import BasicInput, {BasicInputProp} from './BasicInput';
import classNames from 'classnames';
import {AiOutlineCloseCircle} from 'react-icons/all';

export interface StyledInputProp extends BasicInputProp {
  containerClassNames?: string;
  containerStyle?: CSSProperties;
  borderColor?: string;
  borderWidth?: number;
}

export default function StyledInput({borderWidth = 2, borderColor = 'blue', value, onChangeValue, containerClassNames, containerStyle, placeholder, ...rest}: StyledInputProp) {

  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onReset = useCallback(() => {
    onChangeValue('');
  }, [onChangeValue]);

  const containerClass = classNames({focus, active: value !== ''}, containerClassNames);

  return (
      <InputItem style={{borderBottomWidth: borderWidth, ...containerStyle}} className={containerClass}>
        <InputStyle onFocus={onFocus} onBlur={onBlur} onChangeValue={onChangeValue} value={value} {...rest}/>
        <Label focus={focus}>{placeholder}</Label>
        <DefaultBottomBorder style={{height: borderWidth}}/>
        <BottomBorder style={{backgroundColor: borderColor, height: borderWidth}} className="bottom-border"/>
        <ClearIcon onClick={onReset} size={18} color="gray"/>
      </InputItem>
  );
}

const INPUT_PADDING_BOTTOM = 10;

const InputItem = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  padding-top: 20px;
  overflow: hidden;
  
  &.focus, &.active {
  
    label {
      transform: translateY(-30px);
      color: black;
    }  
    
    .bottom-border {
      left: 0;
    }
  }
`;

const InputStyle = styled(BasicInput)`
  width: calc(100% - 30px);
  font-size: 16px;
  padding: ${INPUT_PADDING_BOTTOM}px 0;
`;

const Label = styled.label<{focus: boolean}>`
  position: absolute;
  bottom: ${INPUT_PADDING_BOTTOM}px;
  transition: 0.5s;
  font-size: 16px;
  color: lightgray;
`;

const DefaultBottomBorder = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: lightgray;
`;

const BottomBorder = styled(DefaultBottomBorder)`
  left: -100%;
  transition: all 0.5s;
  z-index: 1;
`;

const ClearIcon = styled(AiOutlineCloseCircle)`
  position: absolute;
  right: 5px;
  bottom: ${INPUT_PADDING_BOTTOM}px;
  cursor: pointer;
`;
