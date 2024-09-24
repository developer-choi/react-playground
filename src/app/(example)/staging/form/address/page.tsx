'use client';

import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import React, {useCallback} from 'react';
import {AddressFormData, useAddressForm, useOpenPostcodePopup} from '@/utils/service/user/fields/daum-postcode';
import {baseHandleErrors} from '@/utils/extend/library/react-hook-form';
import Input, {InputProps} from '@/components/form/Input';
import {FormElementUnderText, Label} from '@/components/form/form-elements';
import Button from '@/components/element/Button';
import styles from './page.module.scss';

// URL: http://localhost:3000/staging/form/address
// Doc: https://docs.google.com/document/d/1j0zm2e7ddZQxreYZhe-D5sHkf9V4ot0FVVJXuZuDdo8/edit#heading=h.psdz753ky71c
export default function Page() {
  return (
    <SignupAddressForm/>
  );
}

function SignupAddressForm() {
  const {onSubmit, inputProps, openPostcodePopup} = useSignupAddressForm();

  return (
    <form onSubmit={onSubmit} className={styles.pageWrap}>
      <Input {...inputProps.name}/>

      <div className={styles.addressWrap}>
        <Label>기획에서 정한 주소 라벨 텍스트</Label>
        <div className={styles.postCode}>
          <Input {...inputProps.address.zonecode}/>
          <Button onClick={openPostcodePopup}>우편번호</Button>
        </div>
        <Input {...inputProps.address.address}/>
        <Input {...inputProps.address.addressDetail}/>
        <FormElementUnderText type="error">{inputProps.address.formErrorMessage}</FormElementUnderText>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

interface SignAddressFormData extends AddressFormData {
  name: string;
}

function useSignupAddressForm() {
  const methods = useForm<SignAddressFormData>();

  const inputProps = useAddressForm<SignAddressFormData>(methods);

  const nameProps: InputProps = {
    ...methods.register('name', {required: '이름은 필수임'}),
    placeholder: '이름'
  };

  const openPostcodePopup = useOpenPostcodePopup(methods);

  const onError: SubmitErrorHandler<SignAddressFormData> = useCallback(({name, address, address_detail, zonecode}) => {
    if (zonecode || address) {
      openPostcodePopup();
      return;
    }

    baseHandleErrors([name, address_detail]);
  }, [openPostcodePopup]);

  const onSubmit: SubmitHandler<SignAddressFormData> = useCallback(data => {
    console.log('data', data);
  }, []);

  return {
    inputProps: {
      name: nameProps,
      address: inputProps
    },
    openPostcodePopup,
    onSubmit: methods.handleSubmit(onSubmit, onError)
  };
}
