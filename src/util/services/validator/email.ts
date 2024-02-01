import type {ValidateResult} from "@util/services/validator/validator-core";
import {validateEmpty} from "@util/services/validator/validator-core";

export function validateEmail(value: string): ValidateResult {
  const emptyResult = validateEmpty({value, prefix: "이메일을 "});

  if (!emptyResult.validated) {
    return emptyResult;
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emptyResult.result)) {
    return {
      validated: true,
      result: emptyResult.result
    };
  } else {
    return {
      validated: false,
      reason: "INVALID_EMAIL",
      errorMessage: "이메일 형식이 올바르지 않습니다."
    };
  }
}
