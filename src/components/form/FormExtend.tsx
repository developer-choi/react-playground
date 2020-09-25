import React, {ComponentProps, FormEvent, useCallback} from 'react';

export interface FormProp extends ComponentProps<'form'> {

}

/**
 * onSubmit 콜백 실행시 페이지 새로고침을 막기위해
 * event.preventDefault() 호출 후 onSubmit 콜백을 실행합니다.
 */
export default function FormExtend({onSubmit, ...rest}: FormProp) {

  const _onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    onSubmit?.(event);

  }, [onSubmit]);

  return (
      <form onSubmit={_onSubmit} {...rest}/>
  );
}
