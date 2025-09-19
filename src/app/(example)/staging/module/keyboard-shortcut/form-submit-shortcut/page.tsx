'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import {KeyboardEvent, useCallback} from 'react';
import styles from './page.module.scss';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';

/**
 * URL: http://localhost:3000/staging/module/keyboard-shortcut/form-submit-shortcut
 * Doc: https://docs.google.com/document/d/1mH1bLEUtys1WOLKsSSOS0fwOeTrHVdJSCyvu9rVSofI/edit#heading=h.7g0b3jegikqf
 *
 * Text Area에 포커스 대고 Ctrl Enter 하면 로그찍힘. (= 단축키로 폼서브밋 시키기)
 */
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>({
    shouldFocusError: false
  });

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
    <form className={styles.formWrap} onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('title')}/>
      <TextArea {...register('content')} onKeyDown={onKeyDown}/>
    </form>
  );
}

interface TestFormData {
  title: string;
  content: string;
}
