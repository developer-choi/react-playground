import React, {ChangeEvent, ComponentProps, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';

export interface InputExtendProp extends Omit<ComponentProps<'input'>, 'ref'> {
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
  value: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url' | undefined;
  
  /**
   * onChange event가 발생했을 때, ingoreValues에 있는 요소중 1개라도 event.target.value 값에 포함되어있으면 onChangeText가 호출되지 않습니다.
   * @example ignoreValues로 ["-"]를 전달할 경우, event.target.value의 문자열에 "-"가 포함되어있다면 onChangeText는 호출되지 않습니다.
   * allowValues props와 동시에 사용할 수 없습니다.
   * onChange는 어떠한 경우에도 호출됩니다.
   */
  ignoreValues?: string[];
  
  /**
   * onChange event가 발생했을 때, event.target.value의 모든 문자가 allowValues에 포함되어있어야만 onChangeText가 호출됩니다.
   * @example allowValues로 ["0", "1", "2", "3"]를 전달할 경우, event.target.value가 "0", "1", "2", "3"로 이루어져야만 onChangeText가 호출됩니다.
   * onChange는 어떠한 경우에도 호출됩니다.
   */
  allowValues?: string[];
}

export default forwardRef(function InputExtend(props: InputExtendProp, ref: Ref<HTMLInputElement>) {
  
  const {
    /**
     * HTML input Prop
     */
    onKeyUp, type, maxLength = 1000, onChange, onKeyDown,
    
    /**
     * Custom Prop
     */
    onCtrlV, onEnter, onChangeText, ignoreValues = [], allowValues = [], ...rest
  } = props;
  
  const customOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    
    const {key} = event;
    
    switch (key) {
      case 'Enter':
        onEnter?.(event);
        break;
    }
  }, [onKeyDown, onEnter]);
  
  const customOnKeyUp = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    
    onKeyUp?.(event);
    
    if (onCtrlV && event.ctrlKey && event.key.toLowerCase() === 'v') {
      //@ts-ignore
      onCtrlV(event.target.value);
      return;
    }
    
  }, [onKeyUp, onCtrlV]);
  
  const customOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    
    if (allowValues.length > 0 && ignoreValues.length > 0) {
      throw Error('allowValues props와 ignoreValues props는 동시에 전달할 수 없습니다.');
    }
    
    const {value} = event.target;
    
    if (value.length > maxLength) {
      return;
    }
    
    if (ignoreValues.length > 0 && ignoreValues.some(ignore => value.indexOf(ignore) !== -1)) {
      return;
    }
    
    const valueCharacters = Array.from(new Set(value.split('')));
    if (allowValues.length > 0 && valueCharacters.some(character => !allowValues.includes(character))) {
      return;
    }
    
    onChangeText?.(value);
  }, [maxLength, onChange, onChangeText, ignoreValues, allowValues]);
  
  return (
      <input ref={ref} type={type} onKeyUp={customOnKeyUp} onChange={customOnChange} onKeyDown={customOnKeyDown} {...rest}/>
  );
});
