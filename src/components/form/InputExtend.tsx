import React, {ChangeEvent, ComponentProps, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';

export interface InputExtendProp extends Omit<ComponentProps<'input'>, 'ref'> {
  onTab?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeText?: (value: string) => void;
  onCtrlV?: () => void;
}

/**
 * onCtrlV의 문제는,
 * JS에서 Keydown ==> Input ==> Keyup 순서로 이벤트가 발생하기 떄문에,
 * Keydown에서 onCtrlV로 next input의 focus를 실행할 경우에 next input에 값이 입력되는 버그가 생겨버린다.
 * 또한, Ctrl V했을 때 Ctrl V한 값을 가져올 수도 없었다.
 */
export default forwardRef(function InputExtend({onCtrlV, onTab, onEnter, onChangeText, onChange, onKeyDown, ...rest}: InputExtendProp, ref: Ref<HTMLInputElement>) {

  const needNotOnKeyDown = [onTab, onEnter, onKeyDown, onCtrlV].every(callback => callback === undefined);

  const _onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    if (onCtrlV && event.ctrlKey && event.key.toLowerCase() === 'v') {
      onCtrlV();
      return;
    }

    switch (event.key) {
      case 'Enter':
        onEnter?.(event);
        break;

      case 'Tab':
        onTab?.(event);
        break;
    }

    onKeyDown?.(event);

  }, [onCtrlV, onKeyDown, onTab, onEnter]);

  const needNotOnChange = onChange === undefined && onChangeText === undefined;

  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(event.target.value);
    onChange?.(event);
  }, [onChange, onChangeText]);

  return (
      <input ref={ref} onChange={needNotOnChange ? undefined : _onChange} onKeyDown={needNotOnKeyDown ? undefined : _onKeyDown} {...rest}/>
  );
});
