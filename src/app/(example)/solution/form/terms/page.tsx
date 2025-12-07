'use client';

import designSystemStyles from '@forworkchoe/core/design-system.module.scss';
import {RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {ChangeEvent, useCallback} from 'react';
import Checkbox, {CheckboxProps} from '@/components/form/Checkbox';
import {Button} from '@forworkchoe/core/components';
import {FormElementUnderText} from '@/components/form/form-elements';
import {getMessageFromFieldErrors} from '@/utils/service/common/inputs';

// URL: http://localhost:3000/solution/form/terms
// Doc: https://docs.google.com/document/d/1cupk32maDTWKqu3SqoinuxmshuPxVN49tUZo49o9nvc/edit?tab=t.0
export default function Page() {
  const {register, handleSubmit, watch, setValue, formState: {errors, isSubmitted}} = useForm<TermsFormData>();

  const onError: SubmitErrorHandler<TermsFormData> = useCallback((errors) => {
    console.error(errors);
  }, []);

  const onSubmit: SubmitHandler<TermsFormData> = useCallback(async (data) => {
    console.log('data', data);
  }, []);

  // 전체동의는 폼데이터에 따로 저장하지않고 나머지 동의 데이터를 직접 컨트롤 하는 방향으로 잡았음.
  const onChangeAllAgree = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    /**
     * shouldValidate = false로 냅두면, 에러메시지 뜬 상태에서 전체 동의값 바꿔도 에러메시지 안사라짐
     * 그렇다고 shouldValidate = true로 했다간, 최초 제출 전에 (mode가 onSubmit 기본값일 때) 전체동의 했다가 풀면 에러메시지가 생겨버림.
     * 그래서 mode가 onSubmit이라면 isSubmitted 가 맞음.
     */
    setValue('required1', event.target.checked, {shouldValidate: isSubmitted});
    setValue('optional1', event.target.checked, {shouldValidate: isSubmitted});
  }, [isSubmitted, setValue]);

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
