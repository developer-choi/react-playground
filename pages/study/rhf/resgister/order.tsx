import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import { useDelay } from '@util/extend/time';

/**
 * URL: http://localhost:3000/study/rhf/resgister/order
 *
 * 재현방법
 * 해당 페이지 접속하고 1초뒤에 제출버튼 눌러보면,
 * errors 객체 값 들어있는 순서가 2 1 3임.
 * 즉, register()가 호출된 순서대로 유효성검증한다는 것을 알 수 있음.
 */

export default function Home() {
  const {register, handleSubmit} = useForm<TestFormData>();

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error(Object.entries(errors))
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  const enableField1 = useDelay(900)
  const enableField2 = useDelay(300)
  const enableField3 = useDelay(600)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {!enableField1 ? null : (
        <input {...register('field1', {
          required: {
            value: true,
            message: 'field1 필수임'
          }
        })}/>
      )}
      {!enableField2 ? null : (
        <input {...register('field2', {
          required: {
            value: true,
            message: 'field2 필수임'
          }
        })}/>
      )}
      {!enableField3 ? null : (
        <input {...register('field3', {
          required: {
            value: true,
            message: 'field3 필수임'
          }
        })}/>
      )}
      <button>제출</button>
    </form>
  )
}

interface TestFormData {
  field1: string
  field2: string
  field3: string
}