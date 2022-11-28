import React from 'react';
import type {FieldErrors, FieldPath, FieldValues, RegisterOptions, UseFormRegister} from 'react-hook-form';

export interface PhoneData {
  part1: string;
  part2: string;
  part3: string;
}

interface PhoneInputProps<T extends FieldValues, N extends FieldPath<T>> {
  register: UseFormRegister<T>;
  names: N[];
  required: boolean;
}

export default function PhoneInput<T extends FieldValues, N extends FieldPath<T>>({register, required, names}: PhoneInputProps<T, N>) {
  const [name1, name2, name3] = names;

  return (
    <div>
      <input placeholder="phone" {...register(name1, !required ? FIRST_PHONE_INPUT_OPTIONS : {...FIRST_PHONE_INPUT_OPTIONS, ...REQUIRED_OPTIONS})}/>
      <input placeholder="phone" {...register(name2, !required ? REST_PHONE_INPUT_OPTIONS : {...REST_PHONE_INPUT_OPTIONS, ...REQUIRED_OPTIONS})}/>
      <input placeholder="phone" {...register(name3, !required ? REST_PHONE_INPUT_OPTIONS : {...REST_PHONE_INPUT_OPTIONS, ...REQUIRED_OPTIONS})}/>
    </div>
  );
}

export function phonePartsToString({part1, part2, part3}: PhoneData, separator = '') {
  return [part1, part2, part3].join(separator);
}

export function phoneErrors(errors?: FieldErrors<PhoneData>) {
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
export function validateDetailPhone({part1, part2, part3}: PhoneData) {
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
