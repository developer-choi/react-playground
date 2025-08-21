'use client';

import {FieldPath, FieldValues, SubmitErrorHandler, SubmitHandler, useForm, UseFormReturn} from 'react-hook-form';
import React, {useCallback} from 'react';
import {
  getAddressDetailInputProps,
  getAddressInputProps,
  getZonecodeInputProps,
  useOpenPostcodePopup
} from '@/utils/service/common/inputs/daum-postcode';
import {baseHandleErrors} from '@/utils/extend/library/react-hook-form';
import Input, {InputProps} from '@/components/form/Input';
import Button from '@/components/element/Button';
import styles from './page.module.scss';

// URL: http://localhost:3000/staging/form/address
// Doc: https://docs.google.com/document/d/1j0zm2e7ddZQxreYZhe-D5sHkf9V4ot0FVVJXuZuDdo8/edit#heading=h.psdz753ky71c
export default function Page() {
  return (
    // <SignupAddressForm/>
    <EditMemberPage/>
  );
}

function EditMemberPage() {
  const methods = useForm<EditMemberFormData>();

  const onSubmit: SubmitHandler<EditMemberFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.pageWrap}>
      <CommonAddressForm
        methods={methods}
        names={{address: 'address', addressDetail: 'addressDetail', zonecode: 'zonecode'}}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SignupAddressForm() {
  const {onSubmit, inputProps, openPostcodePopup} = useSignupAddressForm();

  return (
    <form onSubmit={onSubmit} className={styles.pageWrap}>
      <Input {...inputProps.name}/>

      <div className={styles.addressWrap}>
        <div className={styles.postCode}>
          <Input {...inputProps.address.zonecode}/>
          <Button onClick={openPostcodePopup}>우편번호</Button>
        </div>
        <Input {...inputProps.address.address}/>
        <Input {...inputProps.address.addressDetail}/>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

interface SignAddressFormData {
  zonecode: string;
  address: string;
  addressDetail: string;
  name: string;
}

type EditMemberFormData = Omit<SignAddressFormData, 'name'>;

/**
 * Case 1. UI를 기존 주소폼과 다르게 쓰는 대신 로직만 재사용 하는 경우
 * getXXXInputProps()를 전부 직접 호출해서 옵션 전달하면 됨.
 */
function useSignupAddressForm() {
  const methods = useForm<SignAddressFormData>();
  const openPostcodePopup = useOpenPostcodePopup(methods, {
    address: 'address',
    addressDetail: 'addressDetail',
    zonecode: 'zonecode'
  });

  const nameProps: InputProps = {
    ...methods.register('name', {required: '이름은 필수임'}),
    placeholder: '이름'
  };

  const onError: SubmitErrorHandler<SignAddressFormData> = useCallback(({name, address, addressDetail, zonecode}) => {
    // TODO 이 예외처리는 매번 다른 폼마다 중복되긴 하겠는데...? ==> 이것만 처리하는 함수로 분리예정
    if (zonecode || address) {
      openPostcodePopup();
      return;
    }

    baseHandleErrors([name, addressDetail]);
  }, [openPostcodePopup]);

  const onSubmit: SubmitHandler<SignAddressFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  return {
    inputProps: {
      name: nameProps,
      address: {
        zonecode: getZonecodeInputProps({form: {methods, name: 'zonecode'}}, openPostcodePopup),
        address: getAddressInputProps({form: {methods, name: 'address'}}, openPostcodePopup),
        addressDetail: getAddressDetailInputProps({form: {methods, name: 'addressDetail'}}),
      }
    },
    openPostcodePopup,
    onSubmit: methods.handleSubmit(onSubmit, onError)
  };
}

/**
 * Case 2. UI 조차도 공통컴포넌트와 동일한 경우
 * 공통 컴포넌트를 사용하기만 하면 되는데,
 * 커스텀을 얼마나 열어줄지 (props)는 그때그때 상황봐서.
 * 풀 커스텀 하게 한다 > props로 input 1개당 FormInputParam 전부 다 받아내면 되는데 그럼 그만큼 전달해야하는 값이 많아짐.
 * 일부만 커스텀 하게 한다 > name만 전달하는 식으로 좀 조절하면 그만큼 전달해야하는 값이 줄어듬.
 */
interface CommonAddressFormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  names: {
    zonecode: FieldPath<T>;
    address: FieldPath<T>;
    addressDetail: FieldPath<T>;
  };
}

function CommonAddressForm<T extends FieldValues>({names, methods}: CommonAddressFormProps<T>) {
  const openPostcodePopup = useOpenPostcodePopup(methods, names);
  const zonecode = getZonecodeInputProps({form: {methods, name: names.zonecode}}, openPostcodePopup);
  const address = getAddressInputProps({form: {methods, name: names.address}}, openPostcodePopup);
  const addressDetail = getAddressDetailInputProps({form: {methods, name: names.addressDetail}});

  return (
    <div className={styles.addressWrap}>
      <div className={styles.postCode}>
        <Input {...zonecode}/>
        <Button onClick={openPostcodePopup}>우편번호</Button>
      </div>
      <Input {...address}/>
      <Input {...addressDetail}/>
    </div>
  );
}
