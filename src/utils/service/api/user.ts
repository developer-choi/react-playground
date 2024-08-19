import {customFetchOnClientSide} from '@/utils/extend/library/fetch';

export interface UserFieldCountApiRequest {
  type: 'email' | 'nick_name';
  value: string;
  validationMode: 'exist' | 'does-not-exist'; // exist: 있는게 정상, 그 반대는 없는게 정상.

  /**
   * 차단회원 제외할지 여부.
   * 회원가입할 때는 아이디 조회하는 경우 탈퇴한 아이디로 못만들게 해야하지만, (count 계산 시 포함시켜서 count > 0인 값이 응답되게 해야)
   * 비번찾기할 때 아이디 조회하는 경우, 탈퇴한 아이디로는 못찾게 해야함. (count 계산 시 미포함시켜서 count === 0 되게)
   * 기본값 false
   */
  onlyActiveUser?: boolean;
}

export interface ProcessedUserFieldCountApiResponse {
  validated: boolean;
  errorMessage?: string;
}

/**
 * 아이디, 이메일, 닉네임 중복 및 유효성 검증
 */
export async function getUserFieldCountApi({validationMode, ...rest}: UserFieldCountApiRequest): Promise<ProcessedUserFieldCountApiResponse> {
  try {
    const {json: {count}} = await customFetchOnClientSide(`/api/test/user/field/count`, {
      method: 'GET',
      authorize: 'public',
      query: rest
    });

    const isValid = validationMode === 'does-not-exist' ? count === 0 : count > 0;

    return {
      validated: isValid,
      errorMessage: isValid ? undefined :
        validationMode === 'does-not-exist'
          ? '이미 존재하는 값입니다.' // 예: 회원가입 중복 검사 시
          : '해당 값이 존재하지 않습니다.' // 예: 비밀번호 찾기 시
    };
  } catch (error: any) {
    return {
      validated: false,
      errorMessage: error.message,
    };
  }
}
