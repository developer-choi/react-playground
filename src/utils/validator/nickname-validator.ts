import {validateEmpty, ValidatorParam, ValidatorResult} from './validator-core';

export const NICKNAME_LENGTH = {
  max: 12,
  min: 2
};

export function validateNickname({value}: ValidatorParam): ValidatorResult {
  const emptyResult = validateEmpty({value, prefix: '닉네임을 '});
  
  if (!emptyResult.validated) {
    return emptyResult;
  }
  
  const result = emptyResult.result as string;
  const {length} = result;
  
  if (length < NICKNAME_LENGTH.min || NICKNAME_LENGTH.max < length) {
    return {
      validated: false,
      errorMessage: `닉네임은 ${NICKNAME_LENGTH.min}자리 이상, ${NICKNAME_LENGTH.max}자리 이하로 입력하셔야 합니다.`
    };
  
  
    /**
     const someLang = 'kr'; ==> 어딘가에 저장되어있는 사용자의 언어
 
     const translationMap: Record<'kr' | 'en', Record<'msg1', string>> = {
       en: {
         msg1: 'Hello'
       },
       kr: {
         msg1: '안녕하세요'
       }
     };
 
     return {
       validated: false,
       errorMessage: translationMap[someLang].msg1
     };
     */
  }
  
  return {
    validated: true,
    result
  };
}
