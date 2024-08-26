import type {FieldPath, FieldPathValue, RegisterOptions, UseFormReturn} from 'react-hook-form';
import {useCallback} from 'react';
import {Address, useDaumPostcodePopup} from 'react-daum-postcode';
import {InputProps} from '@/components/form/Input';

/**
 * 2개의 함수를 제공함
 * 1. useOpenPostcodePopup() ==> 주소모달 띄우기
 * 2. useAddressForm() ==> 주소입력폼에 들어가는 인풋 3개 유효성검증과 각종 텍스트가 포함된 props객체 반환
 */

export interface AddressFormData {
  zonecode: string;
  address: string;
  address_detail: string;
}

export function useOpenPostcodePopup<T extends AddressFormData>(methods: Pick<UseFormReturn<T>, 'setValue' | 'setFocus'>) {
  const open = useDaumPostcodePopup();

  //https://github.com/bernard-kms/react-daum-postcode#popup
  return useCallback(() => {
    const formName = {
      zonecode: 'zonecode' as FieldPath<T>,
      address: 'address' as FieldPath<T>,
      addressDetail: 'addressDetail' as FieldPath<T>,
    };

    open({
      onComplete: (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        
        // on completed
        methods.setValue(formName.zonecode, data.zonecode as FieldPathValue<T, FieldPath<T>>, {
          shouldDirty: true, // 이거 안하면, 내정보 수정페이지에서 isDirty로 수정한 항목이 없습니다 체크할 때 안걸림.
          shouldValidate: true // 이거 안하면, 주소입력안하고 제출해서 주소 에러 뜬 상태에서 주소팝업으로 주소 입력 하더라도 에러 바로 안사라지고 제출버튼 눌러야 사라짐.
        });
        methods.setValue(formName.address, fullAddress as FieldPathValue<T, FieldPath<T>>, {
          shouldDirty: true,
          shouldValidate: true
        });
        methods.setFocus(formName.addressDetail);
      }
    });
  }, [methods, open]);
}

export type CustomAddressFormOption<T extends AddressFormData> = Partial<Record<keyof AddressFormData, Partial<{
  options: RegisterOptions<T>;
  inputProps: InputProps
}>>>;

export function useAddressForm<T extends AddressFormData>(methods: UseFormReturn<T>, customOptions?: CustomAddressFormOption<T>) {
  const formName = {
    zonecode: 'zonecode' as FieldPath<T>,
    address: 'address' as FieldPath<T>,
    addressDetail: 'addressDetail' as FieldPath<T>,
  };

  const openPostcodePopup = useOpenPostcodePopup(methods);

  // 인풋 3개의 에러메시지는 모두 상세주소 밑에 한다고 가정하고 에러메시지 준비
  const error = methods.formState.errors;
  const errorMessages = {
    zonecode: error.zonecode?.message as string | undefined,
    address: error.address?.message as string | undefined,
    addressDetail: error.address_detail?.message as string | undefined,
  };

  const formErrorMessage = errorMessages.zonecode ?? errorMessages.address ?? errorMessages.addressDetail;

  const zonecodeProps: InputProps = {
    ...methods.register(formName.zonecode, {
      required: {
        value: true,
        message: '우편번호는 필수입니다.',
      },
      ...customOptions?.zonecode?.options
    }),
    readOnly: true,
    onClick: openPostcodePopup,
    placeholder: '기획서에있는 우편번호 텍스트',
    error: errorMessages.zonecode,
    hiddenErrorMessage: true,
    ...customOptions?.zonecode?.inputProps
  };

  const addressProps: InputProps = {
    ...methods.register(formName.address, {
      required: {
        value: true,
        message: '주소는 필수입니다.',
      },
      ...customOptions?.address?.options
    }),
    readOnly: true,
    error: errorMessages.zonecode,
    hiddenErrorMessage: true,
    placeholder: '기획서에있는 주소 텍스트',
    ...customOptions?.address?.inputProps
  };

  const addressDetailProps: InputProps = {
    ...methods.register(formName.addressDetail, {
      required: {
        value: true,
        message: '상세주소는 필수입니다.',
      },
      ...customOptions?.address_detail?.options,
    }),
    placeholder: '기획서에있는 상세주소 텍스트',
    error: errorMessages.zonecode,
    hiddenErrorMessage: true,
    ...customOptions?.address_detail?.inputProps
  };

  return {
    zonecode: zonecodeProps,
    address: addressProps,
    addressDetail: addressDetailProps,
    formErrorMessage
  };
}
