import React, {ChangeEvent, ComponentProps, FormEvent, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';

/**
 * 길이가 긴 값은 input 태그가 아니라 textarea 태그가 어울리는 경우가 많습니다.
 *
 * 제가 input태그로 긴 값을 입력할거라고 예상했던 케이스는 아래와 같습니다.
 * 1. 지갑주소
 * 2. URI
 */
export const DEFAULT_MAX_LENGTH = 1000;

/**
 * 이 컴포넌트를 제작할 때 고려된 input의 type은 아래와 같습니다.
 */
export type InputExtendType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'search' | 'url' | undefined;

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
  type?: InputExtendType;

  /**
   *
   */
  toLowerCase?: boolean;
}

export default forwardRef(function InputExtend({toLowerCase, maxLength = DEFAULT_MAX_LENGTH, onCtrlV, onTab, onEnter, onChangeText, onChange, onKeyDown, ...rest}: InputExtendProp, ref: Ref<HTMLInputElement>) {

  const needNotOnKeyDown = [onEnter, onKeyDown, onCtrlV].every(callback => callback === undefined);
  const needNotOnKeyUp = [onCtrlV].every(callback => callback === undefined);

  const _onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    switch (event.key) {
      case 'Enter':
        onEnter?.(event);
        break;

      case 'Tab':
        onTab?.(event);
        break;
    }

    onKeyDown?.(event);

  }, [onKeyDown, onTab, onEnter]);

  const _onKeyUp = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    if (onCtrlV && event.ctrlKey && event.key.toLowerCase() === 'v') {
      //@ts-ignore
      onCtrlV(event.target.value);
      return;
    }

  }, [onCtrlV]);

  const needNotOnChange = onChange === undefined && onChangeText === undefined;

  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    const {value} = event.target;
    const truncatedValue = value.slice(0, maxLength);

    onChangeText?.(toLowerCase ? truncatedValue.toLowerCase() : truncatedValue);
    onChange?.(event);
  }, [maxLength, onChange, toLowerCase, onChangeText]);

  const onInvalid = useCallback((event: FormEvent<HTMLInputElement>) => {
    //invalid event때문에 type email했을 때 'as'만 입력하고 엔터치면 system alert이 발생했던 것. 이것은 form의 submit 이벤트를 prevent한다고 사라지지않음.
    event.preventDefault();
  }, []);

  return (
      <input ref={ref} onInvalid={onInvalid} onKeyUp={needNotOnKeyUp ? undefined : _onKeyUp} onChange={needNotOnChange ? undefined : _onChange} onKeyDown={needNotOnKeyDown ? undefined : _onKeyDown} {...rest}/>
  );
});
