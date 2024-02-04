import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import React, {ComponentPropsWithoutRef, CSSProperties, forwardRef, Ref, useCallback} from "react";
import styled from "styled-components";
import Button from "@component/atom/element/Button";

export default function Page() {
  const {register, handleSubmit, setValue} = useForm<ParentFormData>();

  const onError: SubmitErrorHandler<ParentFormData> = useCallback(errors => {
    if (errors.someRequiredValue) {
      alert(errors.someRequiredValue.message)
    }
  }, []);

  const onSubmit: SubmitHandler<ParentFormData> = useCallback(data => {
    console.log(data);
  }, []);

  const setRequiredValue = useCallback((value: string) => {
    setValue('someRequiredValue', value)
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledInput {...register('name')}/>

      <HiddenInput {...register('someRequiredValue', {required: {value: true, message: '조합을 해야함'}})}/>
      <ChildForm onSuccess={setRequiredValue}/>

      <StyledInput style={{height: 3000, width: '100%', background: 'red'}}/>

      <Button type="submit">제출</Button>
    </form>
  );
}

interface ParentFormData {
  name: string
  someRequiredValue: string
}

interface ChildFormProps {
  onSuccess: (value: string) => void
}

/**
 * sub form에서 따로 useForm 만들면 여기서 폼데이터가 부모의 폼데이터와 섞이지않게됨.
 * 기존에는 parent form에서 Form Provider를 통해 메소드와 함께 폼데이터까지 같이 공유해서 난감했음.
 */
function ChildForm({onSuccess}: ChildFormProps) {
  const {register, getValues} = useForm<ChildFormData>()

  const compose = useCallback(() => {
    onSuccess(getValues('sub1') + getValues('sub2'))
  }, [getValues, onSuccess]);

  return (
    <>
      <StyledInput {...register('sub1')}/>
      <StyledInput {...register('sub2')}/>
      <button type="button" onClick={compose}>조합버튼</button>
    </>
  )
}

interface ChildFormData {
  sub1: string
  sub2: string
}

const HiddenInput = forwardRef(function HiddenInput(
  { style = DEFAULT_STYLE, ...rest }: ComponentPropsWithoutRef<'input'>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input ref={ref} style={style} {...rest}/>
  )
})

const DEFAULT_STYLE: CSSProperties = {
  width: 0,
  height: 0,
  opacity: 0,
}

const StyledInput = styled.input`
  border: 2px solid aqua;
  padding: 5px;
`;
