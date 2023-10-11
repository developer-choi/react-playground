import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import Button from '@component/atom/element/Button';
import {useCallback} from 'react';
import {baseHandleErrors} from '@util/extend/react-hook-form';

/**
 * register()에 required true를 작성하더라도,
 * 그 register()가 호출되지않으면,
 * 폼 제출할 때 유효성검증에서도 빠짐.
 */
export default function Page() {
  const visibleName = true;
  const methods = useForm<TestFormData>();

  const onError: SubmitErrorHandler<TestFormData> = useCallback(({name}) => {
    baseHandleErrors([name], true);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log('submit', data);
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        {!visibleName ? null : (
          <NameInput/>
        )}
        <Button type="submit">제출</Button>
      </form>
    </FormProvider>
  );
}

function NameInput() {
  const {register} = useFormContext<TestFormData>();

  const inputProps = register('name', {
    required: {
      value: true,
      message: '필수임'
    }
  });

  return (
    <input {...inputProps}/>
  );
}

interface TestFormData {
  name: string;
}
