import {ExtractResultCode, generatorExpected} from './api-core';

const LOGIN_EXPECTED: Record<ExtractResultCode<'ERROR_004' | 'ERROR_005'>, string> = {
  /**
   * 차단된 회원일 때.
   */
  ERROR_004: 'global81',

  /**
   * ID는 존재하는데 비번 틀릴 떄,
   * 존재하지않는 ID일 때.
   */
  ERROR_005: 'global80'
};
export const {codes: LOGIN_EXPECTED_CODES, codeToMessage: loginErrorCodeToMessage} = generatorExpected(LOGIN_EXPECTED);
