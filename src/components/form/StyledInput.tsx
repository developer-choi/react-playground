import React, {CSSProperties, useCallback, useState} from 'react';
import styled from 'styled-components';
import InputExtend, {InputExtendProp} from './InputExtend';
import classNames from 'classnames';
import {AiOutlineCloseCircle} from 'react-icons/all';
import {theme} from '../../utils/style/theme';

export interface StyledInputProp extends InputExtendProp {
  containerClassNames?: string;
  containerStyle?: CSSProperties;
  borderColor?: string;
  onReset?: () => void;
}

export default function StyledInput({borderColor = theme.colors.reactBlue, value, onChangeText, containerClassNames, containerStyle, placeholder, onReset, ...rest}: StyledInputProp) {

  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const containerClass = classNames({focus, active: value !== ''}, containerClassNames);

  return (
      <InputItem style={{borderBottomWidth: BORDER_WIDTH, ...containerStyle}} className={containerClass}>
        <InputStyle onFocus={onFocus} onBlur={onBlur} onChangeText={onChangeText} value={value} {...rest}/>
        <Label focus={focus}>{placeholder}</Label>
        <DefaultBottomBorder style={{height: BORDER_WIDTH}}/>
        <BottomBorder style={{backgroundColor: borderColor, height: BORDER_WIDTH}} className="bottom-border"/>
        {onReset && <ClearIcon onClick={onReset} size={18} color="gray"/>}
      </InputItem>
  );
}

const BORDER_WIDTH = 2;
const INPUT_PADDING_BOTTOM = 10;

const InputItem = styled.div`
  display: inline-flex;
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

const InputStyle = styled(InputExtend)`
  width: 100%;
  font-size: 16px;
  padding: ${INPUT_PADDING_BOTTOM}px 30px ${INPUT_PADDING_BOTTOM}px 0;
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
