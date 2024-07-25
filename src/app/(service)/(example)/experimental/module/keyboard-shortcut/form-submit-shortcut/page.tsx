'use client';

import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useCallback, KeyboardEvent} from 'react';
import {baseHandleErrors} from '@/utils/extend/library/react-hook-form';
import {Form} from '@/components/form/form';

/**
 * URL: http://localhost:3000/experimental/module/keyboard-shortcut/form-submit-shortcut
 * Doc: https://docs.google.com/document/d/1mH1bLEUtys1WOLKsSSOS0fwOeTrHVdJSCyvu9rVSofI/edit#heading=h.7g0b3jegikqf
 *
 * Text Area에 포커스 대고 Ctrl Enter 하면 로그찍힘. (= 단축키로 폼서브밋 시키기)
 */
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>({
    shouldFocusError: false
  });

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    baseHandleErrors([errors.title, errors.content]);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      const formElement = (event.currentTarget as HTMLTextAreaElement).closest('form');

      if (formElement) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
        formElement.requestSubmit();
      }

    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('title')}/>
      <textarea {...register('content')} onKeyDown={onKeyDown}/>
    </Form>
  );
}

interface TestFormData {
  title: string;
  content: string;
}
