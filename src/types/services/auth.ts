export interface PostLoginApiRequest {
  email: string;
  password: string;
}

export interface PostLoginApiResponse {
  member_id: number;
  email: string;
  name: string;
  access_token: string;
  code: SuccessLoginCode;
}

export interface PostLoginApiFailResponse {
  code: FailLoginCode;
}

// 성공 기준 : 어쨌든 로그인 처리는 해야하는 응다보드
export type SuccessLoginCode = 'SUCCESS' | 'EXPIRED';

/**
 * NOT_FOUND 아이디, 비번 둘중 하나이상 틀린 경우
 * WITHDRAWAL 탈퇴한 회원
 */
export type FailLoginCode = 'NOT_FOUND' | 'WITHDRAWAL';
