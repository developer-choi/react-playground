import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';

export interface UserFieldCountApiRequest {
  type: 'email' | 'nick_name';
  value: string;

  /**
   * TODO 아래 2개로 가지말고 그냥 validationMode를 ‘find’ | ‘signup’ 이렇게 잡으면 안되나?
   * - 추후 실무에서 작업할 떄 기회가 되면, 그 때 분석해서 useUserFieldApiValidation()와 함께 예제 완성시키기. (Route Handler를 통해 API 까지 온전히 동작하는 예제로)
   *
   * find
   * 1. 있는게 정상
   * 2. 탈퇴회원은 미포함 (탈퇴회원으로 계정을 찾게해주면 안됨)
   *
   * signup
   * 1. 없는게 정상
   * 2. 탈퇴회원은 포함 (탈퇴한 계정의 이메일로 새로 가입이 가능하게 해야함)
   * - 아 물론 이건 사이트마다 약간 다를 수 있긴하지만.
   *
   * 어쨌든 이렇게 하면, onlyActiveUser param 필요가 없어짐.
   */
  validationMode: 'exist' | 'does-not-exist'; // exist: 있는게 정상, 그 반대는 없는게 정상.

  /** TODO Legacy
   * 탈퇴회원 제외할지 여부.
   * 회원가입할 때는 아이디 조회하는 경우 탈퇴한 아이디로 못만들게 해야하지만, (count 계산 시 포함시켜서 count > 0인 값이 응답되게 해야)
   * 비번찾기할 때 아이디 조회하는 경우, 탈퇴한 아이디로는 못찾게 해야함. (count 계산 시 미포함시켜서 count === 0 되게)
   * 기본값 false
   */
  onlyActiveUser: boolean;
}

export interface UserFieldCountApiResponse {
  validated: boolean;
  errorMessage?: string; // 4xx 5xx
}

/**
 * 아이디, 이메일, 닉네임 중복 및 유효성 검증
 */
export async function getUserFieldCountApi({validationMode, ...rest}: UserFieldCountApiRequest): Promise<UserFieldCountApiResponse> {
  try {
    const {data: {count}} = await customFetchOnClientSide<{count: number}>(`/api/user/field/count`, {
      method: 'GET',
      authPolicy: 'none',
      query: rest
    });

    return {
      validated: validationMode === 'does-not-exist' ? count === 0 : count > 0
    };
  } catch (error: any) {
    return {
      validated: false,
      errorMessage: error.message,
    };
  }
}
