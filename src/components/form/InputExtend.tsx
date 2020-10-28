import React, {ChangeEvent, ComponentProps, KeyboardEvent, useCallback} from 'react';

export interface InputExtendProp extends Omit<ComponentProps<'input'>, 'ref'> {
  onTab?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeText?: (value: string) => void;
}

/**
 * enableFocusWhenError?: boolean props추가해보면 괜찮지않을까,
 * 그런데 폼 안에 입력란 여러개있고 여러개 입력란 전부 에러뜨는 경우가 문제이긴함.
 */

export default function InputExtend({onTab, onEnter, onChangeText, onChange, onKeyDown, ...rest}: InputExtendProp) {

  const needNotOnKeyDown = onKeyDown === undefined && onTab === undefined && onEnter === undefined;

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

  const needNotOnChange = onChange === undefined && onChangeText === undefined;

  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(event.target.value);
    onChange?.(event);
  }, [onChange, onChangeText]);

  return (
      <input onChange={needNotOnChange ? undefined : _onChange} onKeyDown={needNotOnKeyDown ? undefined : _onKeyDown} {...rest}/>
  );
}

/**
 * onFocusOrInputed + 클래스이름. 우선순위는 기본 > 액티브 >에러
 * 이걸 BasicInput에서 만들어주면 StyledInput에서 확장하기편해지지.
 */
