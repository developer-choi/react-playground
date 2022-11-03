import {Address, useDaumPostcodePopup} from 'react-daum-postcode';
import {useCallback} from 'react';

export interface PostcodeSummary {
  fullAddress: string; //example: 서울시 무슨구 무슨동
  zonecode: string; //우편번호, example: 21314
}

export default function usePostcodePopup(onComplete: (data: PostcodeSummary) => void) {
  const open = useDaumPostcodePopup();

  //https://github.com/bernard-kms/react-daum-postcode#popup
  const handleComplete = useCallback((data: Address) => {
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

    onComplete({
      fullAddress,
      zonecode: data.zonecode
    });
  }, [onComplete]);

  return useCallback(() => {
    open({onComplete: handleComplete})
  }, [handleComplete, open]);
}
