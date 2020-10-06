import React, {useCallback, useState} from 'react';
import styled, {css} from 'styled-components';
import InputExtend from './InputExtend';
import classNames from 'classnames';
import {AiFillEye, AiFillEyeInvisible, AiOutlineCloseCircle} from 'react-icons/all';
import {getInputInfo, StandardStyledInputProp} from '../../utils/input';
import {theme} from '../../utils/style/theme';

export interface StyledInputProp extends Omit<StandardStyledInputProp, 'placeholder'> {
  label?: string;
}

export default function StyledInput({type, value, onChangeText, containerClassNames, containerStyle, label, onReset, error, success, ...rest}: StyledInputProp) {

  const [focus, setFocus] = useState(false);
  const [applyMask, setApplyMask] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const borderColor = error ? theme.error : theme.main;
  //@ts-ignore
  const isActive = !['', undefined].includes(value) || focus || error || success;

  const containerClass = classNames({active: isActive}, containerClassNames);

  const toggleMask = useCallback(() => {
    setApplyMask(prevState => !prevState);
  }, []);

  const COMMON_MASK_ICON_PROPS = {
    color:"gray",
    onClick: toggleMask
  };

  const {inputType, enableApplyMask, enableApplyNotMask, enableReset} = getInputInfo(type, onReset, applyMask);

  return (
      <InputItem style={{borderBottomWidth: BORDER_WIDTH, ...containerStyle}} withReset={!!onReset} className={containerClass}>
        <InputStyle type={inputType} onFocus={onFocus} onBlur={onBlur} onChangeText={onChangeText} value={value} {...rest}/>
        <Label focus={focus}>{label}</Label>
        <DefaultBottomBorder style={{height: BORDER_WIDTH}}/>
        <ActiveBottomBorder style={{backgroundColor: borderColor, height: BORDER_WIDTH}} className="bottom-border"/>
        {enableReset && <ClearIcon onClick={onReset} size={18} color="gray"/>}
        {enableApplyMask && <ApplyNotMaskIcon {...COMMON_MASK_ICON_PROPS}/>}
        {enableApplyNotMask && <ApplyMaskIcon {...COMMON_MASK_ICON_PROPS}/>}
      </InputItem>
  );
}

const BORDER_WIDTH = 2;
const INPUT_PADDING_BOTTOM = 10;

//label이 입력박스가 활성화되면 위로 올라가는 애니메이션을 넣었는데, 이걸 고려해서 입력박스 Wrapper에 적용할 padding-top 값
const JUMP_LABEL_PADDING_TOP = 20;

//input박스의 outline이 온전히 보일 수 있도록, wrapper에 좌우패딩을 주는 기본값
const DEFAULT_WRAP_PADDING_HORIZONTAL = 2;

const InputItem = styled.div<{withReset: boolean}>`
  display: inline-flex;
  flex-direction: column-reverse;
  position: relative;
  overflow: hidden;
  padding-top: ${INPUT_PADDING_BOTTOM + JUMP_LABEL_PADDING_TOP}px;
  padding-right: ${props => props.withReset ? 30 : DEFAULT_WRAP_PADDING_HORIZONTAL}px;
  padding-bottom: ${INPUT_PADDING_BOTTOM}px;
  padding-left: ${DEFAULT_WRAP_PADDING_HORIZONTAL}px;
  
  &.active {
  
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

const ActiveBottomBorder = styled(DefaultBottomBorder)`
  left: -100%;
  transition: all 0.5s;
  z-index: 1;
`;

const IconCss = css`
  position: absolute;
  right: 5px;
  top: calc(50% + ${JUMP_LABEL_PADDING_TOP / 2}px);
  transform: translateY(-50%);
  cursor: pointer;
`;

const ClearIcon = styled(AiOutlineCloseCircle)`
  ${IconCss};
`;

const ApplyMaskIcon = styled(AiFillEyeInvisible)`
  ${IconCss};
`;

const ApplyNotMaskIcon = styled(AiFillEye)`
  ${IconCss};
`;
