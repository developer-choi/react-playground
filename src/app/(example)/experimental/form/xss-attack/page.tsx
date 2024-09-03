'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import {useCallback, useState} from 'react';

/**
 * URL: http://localhost:3000/experimental/form/xss-attack
 * Doc: https://docs.google.com/document/d/1ZDGGILUjN0lEFfzPBzqnPkmMrLgSicT3lio0sDLF1pQ/edit
 *
 * <script>alert('hello world')</script> 입력해보기
 *
 * 이 로직을 실제로 서비스에 적용한다면... 음... Text Area onChange ==> Form Submit 과정에 적용하는것 보다
 * 그냥 API 호출 직전에 적용하는게 제일 나을듯?
 */
export default function Page() {
  const {register, handleSubmit} = useForm<TestFormData>({
    defaultValues: {
      text: ''
    }
  });

  const [content, setContent] = useState('');

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    setContent(sanitize(data.text));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('text')} />
        <button>Submit</button>
      </form>

      {!content ? null : (
        <div dangerouslySetInnerHTML={{__html: content}} />
      )}
    </>
  );
}

interface TestFormData {
  text: string;
}

function sanitize(input: string) {
  return input.replace(/[&<>"'/]/g, match => ENCODED_CHARACTERS[match as keyof typeof ENCODED_CHARACTERS]);
}

const ENCODED_CHARACTERS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};
