import {ComponentProps, KeyboardEvent} from 'react';

export function decimalSlice(value: string, decimalLength: number) {
  const lastDotIndex = value.lastIndexOf('.');
  
  if (lastDotIndex === -1) {
    return value;
  }
  
  const left = value.slice(0, lastDotIndex);
  
  if (decimalLength === 0) {
    return left;
  }
  
  const right = value.slice(lastDotIndex, lastDotIndex + 1 + decimalLength);
  
  return left + right;
}

export const DEFAULT_INPUT_PROPS: InputExtendProp = {
  /**
   * 길이가 긴 값은 input 태그가 아니라 textarea 태그가 어울리는 경우가 많습니다.
   * 그래서 기본적으로 최대길이를 제한합니다.
   *
   * 제가 input태그로 긴 값을 입력할거라고 예상했던 케이스는 아래와 같습니다.
   * 1. 지갑주소
   * 2. URI
   */
  maxLength: 1000
};

type InputExtendType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url' | undefined;

type WithoutProp = 'ref' | 'onInvalid' | 'onInvalidCapture';

export interface InputExtendProp extends Omit<ComponentProps<'input'>, WithoutProp> {
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeText?: (value: string) => void;

  /**
   * @param text : Control V한 값 (없을 시 빈문자열)
   * 부모 컴포넌트에서 state를 이 컴포넌트의 value prop으로 넘기고,
   * onChange prop으로 입력할 때마다 setState를 하는경우
   * onCtrlV()가 호출되었을 당시에는 아직 setState가 완료되지 않음을 주의해야합니다.
   */
  onCtrlV?: (text: string) => void;

  /**
   * 이 컴포넌트를 만들 때 고려된 Input Type에 의해,
   * value의 타입은 항상 string으로 고정하는것으로 결정했습니다.
   *
   * value의 타입이 string이 아닐경우, 모든 입력값을 지웠을 때 빈문자열이 아닌 경우가 있었기 때문입니다.
   * 대표적인 사례는 아래와 같습니다.
   *
   * const [num, setNum] = useState(0);
   * <input type="number" value={num} onChange={event => setNum(Number(event.target.value))}/>
   * 이 경우, value의 타입이 숫자가 아니기때문에 다 지웠을 때 0이 계속 입력박스에 보이는 문제가 존재합니다.
   */
  value?: string;
  type?: InputExtendType;
}

export interface InputNumberExtend extends Omit<InputExtendProp, 'type'> {
  /**
   * type이 number일 때만 작동하는 Prop입니다.
   * 입력값의 소수 최대길이를 지정할 수 있습니다.
   */
  maxDecimalLength?: number;
}
