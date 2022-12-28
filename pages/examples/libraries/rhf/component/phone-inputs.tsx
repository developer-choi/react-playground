import Button from '@component/atom/element/Button';
import React from 'react';
import type {SubmitErrorHandler, SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import {baseHandleErrors} from '@util/extend/react-hook-form';
import PhoneInput, {
  PhoneData,
  phoneErrors,
  phonePartsToString,
  validateDetailPhone
} from '@component/molecules/PhoneInput';

export default function Page() {
  const {register, handleSubmit} = useForm<AllData>();

  const onSubmit: SubmitHandler<AllData> = ({username, phone, subPhone}) => {
    const isValidatedSubPhone = validateDetailPhone(subPhone);

    const sendData: RequestParameter = {
      username,
      phone: phonePartsToString(phone),
      subPhone: !isValidatedSubPhone ? undefined : phonePartsToString(subPhone)
    };

    axios.post('/api/method/post-some', sendData);
  };

  const onError: SubmitErrorHandler<AllData> = ({phone, subPhone, username}) => {
    baseHandleErrors([...phoneErrors(phone), ...phoneErrors(subPhone), username]);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      {/* 필수연락처 */}
      <PhoneInput required register={register} names={['phone.part1', 'phone.part2', 'phone.part3']}/>
      {/* 선택연락처 */}
      <PhoneInput required={false} register={register} names={['subPhone.part1', 'subPhone.part2', 'subPhone.part3']}/>
      <input placeholder="username" {...register('username')}/>
      <Button type="submit">제출</Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  input {
    border: 1px solid black;
    padding: 5px;
  }
`;

interface RequestParameter {
  username: string;
  phone: string;
  subPhone?: string;
}

interface AllData {
  username: string;
  phone: PhoneData;
  subPhone: PhoneData;
}
