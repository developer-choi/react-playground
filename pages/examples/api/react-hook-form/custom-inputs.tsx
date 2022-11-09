import {Button} from '@component/atom/button/button-presets';
import React from 'react';
import type {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister
} from 'react-hook-form';
import {FieldPath, useForm} from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import {baseHandleErrors} from '@util/extend/react-hook-form';

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

interface PhoneData {
  part1: string;
  part2: string;
  part3: string;
}

interface PhoneInputProps<T extends FieldValues, N extends FieldPath<T>> {
  register: UseFormRegister<T>;
  names: N[];
  required: boolean;
}

function PhoneInput<T extends FieldValues, N extends FieldPath<T>>({register, required, names}: PhoneInputProps<T, N>) {
  const [name1, name2, name3] = names;

  return (
    <div>
      <input placeholder="phone" {...register(name1, !required ? FIRST_PHONE_INPUT_OPTIONS : {...FIRST_PHONE_INPUT_OPTIONS, ...REQUIRED_OPTIONS})}/>
      <input placeholder="phone" {...register(name2, !required ? REST_PHONE_INPUT_OPTIONS : {...REST_PHONE_INPUT_OPTIONS, ...REQUIRED_OPTIONS})}/>
      <input placeholder="phone" {...register(name3, !required ? REST_PHONE_INPUT_OPTIONS : {...REST_PHONE_INPUT_OPTIONS, ...REQUIRED_OPTIONS})}/>
    </div>
  );
}

function phonePartsToString({part1, part2, part3}: PhoneData, separator = '') {
  return [part1, part2, part3].join(separator);
}

function phoneErrors(errors?: FieldErrors<PhoneData>) {
  if (!errors) {
    return [];
  }
  const {part1, part2, part3} = errors;
  return [part1, part2, part3];
}

/**
 * "선택적"으로 입력해야하는 폰번호때 구체적으로 유효성검증을 하기위함.
 * (주로 쇼핑몰에서 주문받을 때 필수연락처 하나 받고 Optional로 연락처 하나 더받을 때도 고려하기위해)
 * [010] - [1] - [2] 이런식으로 제출하는건 registerOptions에 잡히기때문에 고려하지않고,
 * [010] - [] - [] 이런식으로 registerOptions에 안잡히는 케이스만 고려하였음.
 */
function validateDetailPhone({part1, part2, part3}: PhoneData) {
  return [part1, part2, part3].every(value => value.length !== 0);
}

const REQUIRED_OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '해당 항목은 필수입니다.'
  }
};

const FIRST_PHONE_INPUT_OPTIONS: RegisterOptions = {
  maxLength: {
    value: 3,
    message: '3자리만가능'
  },
  minLength: {
    value: 3,
    message: '3자리만가능'
  }
};

const REST_PHONE_INPUT_OPTIONS: RegisterOptions = {
  maxLength: {
    value: 4,
    message: '4자리만가능'
  },
  minLength: {
    value: 4,
    message: '4자리만가능'
  }
};
