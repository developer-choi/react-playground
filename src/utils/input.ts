import {InputExtendProp} from '../components/form/InputExtend';
import {CSSProperties} from 'react';
import {theme} from './style/theme';
import {StyledInputProp} from '../components/form/StyledInput';

export interface StandardStyledInputProp extends InputExtendProp {
  containerClassNames?: string;
  containerStyle?: CSSProperties;
  onReset?: () => void;
  success?: boolean;
  error?: boolean;
}

//우선순위에 따른 외곽선 색상 반환. error > success > 기본
export function getBorderColor({success, error}: Pick<StyledInputProp, 'success' | 'error'>) {

  if (error) {
    return theme.error;

  } else if (success) {
    return theme.success;

  } else {
    return theme.main;
  }
}
