import {InputExtendProp} from '../components/form/InputExtend';
import {ComponentProps, CSSProperties} from 'react';

export interface StandardStyledInputProp extends InputExtendProp {
  containerClassNames?: string;
  containerStyle?: CSSProperties;
  onReset?: () => void;
  success?: boolean;
  error?: boolean;
}

export interface InputInfo {
  inputType: string;
  enableApplyMask: boolean;
  enableApplyNotMask: boolean;
  enableReset: boolean;
}

/**
 * 입력박스의 타입이 password가 아닐 경우에 한해
 * onReset Prop을 받을경우 reset기능이 활성화 시키고 싶고,
 *
 * 입력박스의 타입이 password일 경우에
 * 마스킹처리를 토글할 수 있는 기능이 활성화 시키고 싶기 때문에
 *
 * 입력박스 컴포넌트에서 작동해야 하는 기능을 우선순위에 맞게 계산해주는 함수를 제작하게 되었음.
 */
export function getInputInfo(type: ComponentProps<'input'>['type'], onReset: StandardStyledInputProp['onReset'], applyMask: boolean): InputInfo {
  const inputType = type === 'password' && applyMask ? 'text' : type ?? 'text';
  const enableReset = type !== 'password' && !!onReset;
  const enableApplyMask = type === 'password' && applyMask;
  const enableApplyNotMask = type === 'password' && !applyMask;

  const isInvalidTypeUsage = type === 'password' && !!onReset;

  if (isInvalidTypeUsage) {
    console.warn('type이 password일 경우, reset기능을 제공하지않고 masking 처리를 toggle할 수 있는 기능만 제공됩니다. 그러므로 onReset prop은 이 경우에 무시됩니다.');
  }

  return {
    inputType,
    enableReset,
    enableApplyMask,
    enableApplyNotMask
  };
}
