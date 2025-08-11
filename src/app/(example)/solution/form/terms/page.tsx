'use client';

import designSystemStyles from '@/styles/design-system.module.scss';
import {RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {ChangeEvent, useCallback} from 'react';
import Checkbox, {CheckboxProps} from '@/components/form/Checkbox';
import Button from '@/components/element/Button';
import {FormElementUnderText} from '@/components/form/form-elements';
import {getMessageFromFieldErrors} from '@/utils/service/common/inputs';

// URL: http://localhost:3000/solution/form/terms
// Doc: https://docs.google.com/document/d/1cupk32maDTWKqu3SqoinuxmshuPxVN49tUZo49o9nvc/edit?tab=t.0
export default function Page() {
  const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<TermsFormData>();

  const onError: SubmitErrorHandler<TermsFormData> = useCallback((errors) => {
    console.error(errors);
  }, []);

  const onSubmit: SubmitHandler<TermsFormData> = useCallback(async (data) => {
    console.log('data', data);
  }, []);

  // 전체동의는 폼데이터에 따로 저장하지않고 나머지 동의 데이터를 직접 컨트롤 하는 방향으로 잡았음.
  const onChangeAllAgree = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // shouldValidate 안하면, 필수동의 체크안하고 한번이상 제출한 상태에서 전체동의 눌렀을 때 에러메시지 안사라짐.
    setValue('required1', event.target.checked, {shouldValidate: true});
    setValue('optional1', event.target.checked, {shouldValidate: true});
  }, [setValue]);

  // !! 연산자 안써주면 checked에 undefined 들어가서 체크박스 클릭했을 때 콘솔에 에러찍힘.
  // Warning: A component is changing an uncontrolled input to be controlled.
  const allChecked = !!(watch('required1') && watch('optional1'));

  const allAgreeCheckboxProps: CheckboxProps = {
    onChange: onChangeAllAgree,
    checked: allChecked,
    label: '전체동의'
  };

  const requiredCheckboxProps: CheckboxProps = {
    ...register('required1', REQUIRED_OPTIONS),
    label: '필수동의1'
  };

  const optionalCheckboxProps: CheckboxProps = {
    ...register('optional1'),
    label: '선택동의1'
  };

  return (
    <form style={{padding: 16, width: 400}} className={designSystemStyles.commonForm} onSubmit={handleSubmit(onSubmit, onError)}>
      <Checkbox {...allAgreeCheckboxProps}/>
      <div>
        <Checkbox {...requiredCheckboxProps}/>
        <FormElementUnderText type="error">{getMessageFromFieldErrors(errors, 'required1')}</FormElementUnderText>
      </div>
      <Checkbox {...optionalCheckboxProps}/>
      <Button isSubmit>제출</Button>
    </form>
  );
}

interface TermsFormData {
  required1: boolean;
  optional1: boolean;
}

const REQUIRED_OPTIONS: RegisterOptions<TermsFormData, 'required1'> = {
  required: '필수 약관에 동의해주세요'
};
