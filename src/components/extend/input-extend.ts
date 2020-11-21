import {ComponentProps, KeyboardEvent} from 'react';

export const DEFAULT_INPUT_PROPS: InputExtendProp = {
  /**
   * 길이가 긴 값은 input 태그가 아니라 textarea 태그가 어울리는 경우가 많습니다.
   *
   * 제가 input태그로 긴 값을 입력할거라고 예상했던 케이스는 아래와 같습니다.
   * 1. 지갑주소
   * 2. URI
   */
  maxLength: 1000
};

/**
 * 이 컴포넌트를 제작할 때 고려된 input의 type은 아래와 같습니다.
 */
type InputExtendType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'search' | 'url' | undefined;

type WithoutProp = 'ref' | 'onInvalid' | 'onInvalidCapture';

export interface InputExtendProp extends Omit<ComponentProps<'input'>, WithoutProp> {
  onTab?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
   * 기본 false이며,
   * true일 경우 onChangeText의 parameter로 제공되는 text가 lowerCase로 바뀌어 전달됩니다.
   *
   * toUpperCase를 만들지 않은 이유는,
   *
   * 사용자가 입력시
   * "어? 내가 CapsLock이 눌렸나?" 하는 경우는 있어도
   * "어? 내가 CpasLock이 안눌렸나?" 하는 경우는 굉장히 드물거라고 판단했기 때문입니다.
   *
   * 즉, toLowerCase를 true로 전달하여 사용자가 본인이 입력한 모든값이 소문자로 바뀌어도 이상하게 생각하지 않겠지만,
   * toUpperCase Prop을 true로 전달하여 사용자가 본인이 입력한 모든값이 대문자로 바뀔경우 이상하게 생각할 여지가 있습니다.
   * 그러므로 이것은 사용자경험 측면에서 좋지않다고 판단되어 일부러 toUpperCase Prop를 구현하지않았습니다.
   */
  toLowerCase?: boolean;

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
