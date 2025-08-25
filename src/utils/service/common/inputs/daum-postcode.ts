import {FieldPath, FieldPathValue, FieldValues, UseFormReturn} from 'react-hook-form';
import {useCallback} from 'react';
import {Address, useDaumPostcodePopup} from 'react-daum-postcode';
import {InputProps} from '@/components/form/Input';
import {FormInputParam, getMessageFromFieldErrors} from '@/utils/service/common/inputs/index';

/**
 * 2개의 함수를 제공함
 * 1. useOpenPostcodePopup() ==> 주소모달 띄우기
 * 2. useAddressForm() ==> 주소입력폼에 들어가는 인풋 3개 유효성검증과 각종 텍스트가 포함된 props객체 반환
 */

interface AddressFormData<T extends FieldValues> {
  zonecode: FieldPath<T>;
  address: FieldPath<T>;
  addressDetail: FieldPath<T>;
}

export function useOpenPostcodePopup<T extends FieldValues>(methods: UseFormReturn<T>, names: AddressFormData<T>) {
  const open = useDaumPostcodePopup();

  //https://github.com/bernard-kms/react-daum-postcode#popup
  return useCallback(() => {

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
        methods.setValue(names.zonecode, data.zonecode as FieldPathValue<T, FieldPath<T>>, {
          shouldDirty: true, // 이거 안하면, 내정보 수정페이지에서 isDirty로 수정한 항목이 없습니다 체크할 때 안걸림.
          shouldValidate: true // 이거 안하면, 주소입력안하고 제출해서 주소 에러 뜬 상태에서 주소팝업으로 주소 입력 하더라도 에러 바로 안사라지고 제출버튼 눌러야 사라짐.
        });
        methods.setValue(names.address, fullAddress as FieldPathValue<T, FieldPath<T>>, {
          shouldDirty: true,
          shouldValidate: true
        });
        methods.setFocus(names.addressDetail);
      }
    });
  }, [methods, names.address, names.addressDetail, names.zonecode, open]);
}

export function getZonecodeInputProps<T extends FieldValues>(param: FormInputParam<T>, openPostcodePopup: ReturnType<typeof useOpenPostcodePopup>): InputProps {
  const {texts, form: {name, methods, options}} = param;

  return {
    ...methods.register(name, {
      required: texts?.required ?? '우편번호는 필수입니다.',
      ...options,
    }),
    readOnly: true,
    onClick: openPostcodePopup,
    label: texts?.label ?? '우편번호',
    placeholder: texts?.placeholder ?? '기획서에있는 우편번호 텍스트',
    error: getMessageFromFieldErrors(methods.formState.errors, name),
    hiddenErrorMessage: true,
  };
}

export function getAddressInputProps<T extends FieldValues>(param: FormInputParam<T>, openPostcodePopup: ReturnType<typeof useOpenPostcodePopup>): InputProps {
  const {texts, form: {name, methods, options}} = param;

  return {
    ...methods.register(name, {
      required: texts?.required ?? '주소는 필수입니다.',
      ...options,
    }),
    readOnly: true,
    onClick: openPostcodePopup,
    label: texts?.label ?? '주소',
    placeholder: texts?.placeholder ?? '기획서에있는 주소 텍스트',
    error: getMessageFromFieldErrors(methods.formState.errors, name),
  };
}

export function getAddressDetailInputProps<T extends FieldValues>(param: FormInputParam<T>): InputProps {
  const {texts, form: {name, methods, options}} = param;

  return {
    ...methods.register(name, {
      required: texts?.required ?? '상세주소는 필수입니다.',
      ...options
    }),
    label: texts?.label ?? '상세 주소',
    placeholder: texts?.placeholder ?? '기획서에있는 상세주소 텍스트',
    error: getMessageFromFieldErrors(methods.formState.errors, name),
  };
}
