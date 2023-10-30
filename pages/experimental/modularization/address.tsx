import {SubmitHandler, useForm, useFormContext, UseFormReturn} from 'react-hook-form';
import type {ComponentPropsWithoutRef} from 'react';
import {useCallback} from 'react';
import type {SubmitErrorHandler} from 'react-hook-form/dist/types/form';
import {baseHandleErrors} from '@util/extend/react-hook-form';
import type {FieldPath} from 'react-hook-form/dist/types/path';

export default function Page() {
  return (
    <>
      <MypageAddressForm/>
      <SignupAddressForm/>
    </>
  )
}

function useAddressForm<T extends AddressFormData>(methods: UseFormReturn<T>) {
  const zonecodeProps: ComponentPropsWithoutRef<'input'> = {
    ...methods.register('zonecode' as FieldPath<T>),
    readOnly: true,
  }

  const addressProps: ComponentPropsWithoutRef<'input'> = {
    ...methods.register('address' as FieldPath<T>),
    readOnly: true
  }

  const addressDetailProps: ComponentPropsWithoutRef<'input'> = methods.register('addressDetail' as FieldPath<T>)

  return {
    zonecode: zonecodeProps,
    address: addressProps,
    addressDetail: addressDetailProps
  }
}

interface AddressFormData {
  zonecode: string
  address: string
  addressDetail: string
}

/*************************************************************************************************************
 * 마이페이지에서 쓰는 주소로직
 *************************************************************************************************************/

function MypageAddressForm() {
  const {onSubmit, inputProps} = useMypageAddressForm()

  return (
    <form onSubmit={onSubmit}>
      <input {...inputProps.receiverName}/>
      <input {...inputProps.zonecode}/>
      <input {...inputProps.address}/>
      <input {...inputProps.addressDetail}/>
    </form>
  )
}

interface MypageAddressFormData extends AddressFormData {
  receiverName: string
}

function useMypageAddressForm() {
  const methods = useForm<MypageAddressFormData>({
    defaultValues: {
      address: '',
      addressDetail: '',
      zonecode: '',
      receiverName: ''
    }
  });

  const inputProps = useAddressForm<MypageAddressFormData>(methods)

  //받는사람
  const receiverNameProps: ComponentPropsWithoutRef<'input'> = {
    ...methods.register('receiverName')
  }

  const onError: SubmitErrorHandler<MypageAddressFormData> = useCallback(({receiverName, address, addressDetail, zonecode}) => {
    baseHandleErrors([receiverName, zonecode, address, addressDetail])
  }, []);

  const onSubmit: SubmitHandler<MypageAddressFormData> = useCallback(data => {
    console.log('mypage onSubmit', data);
  }, []);

  return {
    inputProps: {
      ...inputProps,
      receiverName: receiverNameProps
    },
    onSubmit: methods.handleSubmit(onSubmit, onError)
  }
}


/*************************************************************************************************************
 * 회원가입페이지에서 쓰는 주소로직
 *************************************************************************************************************/

function SignupAddressForm() {
  const {onSubmit, inputProps} = useSignupAddressForm()

  return (
    <form onSubmit={onSubmit}>
      <input {...inputProps.name}/>
      <input {...inputProps.email}/>
      <input {...inputProps.zonecode}/>
      <input {...inputProps.address}/>
      <input {...inputProps.addressDetail}/>
    </form>
  )
}

interface SignAddressFormData extends AddressFormData {
  email: string
  name: string
}

function useSignupAddressForm() {
  const methods = useFormContext<SignAddressFormData>()

  const inputProps = useAddressForm<SignAddressFormData>(methods)
  const nameProps: ComponentPropsWithoutRef<'input'> = {
    ...methods.register('name'),
    placeholder: '이름'
  };
  const emailProps: ComponentPropsWithoutRef<'input'> = {
    ...methods.register('email'),
    placeholder: '이메일'
  }

  const onError: SubmitErrorHandler<SignAddressFormData> = useCallback(({name, email, address, addressDetail, zonecode}) => {
    baseHandleErrors([name, email, zonecode, address, addressDetail])
  }, []);

  const onSubmit: SubmitHandler<SignAddressFormData> = useCallback(data => {
    console.log('mypage onSubmit', data);
  }, []);

  return {
    inputProps: {
      ...inputProps,
      name: nameProps,
      email: emailProps
    },
    onSubmit: methods.handleSubmit(onSubmit, onError)
  }
}
