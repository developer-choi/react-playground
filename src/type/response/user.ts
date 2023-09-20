import type {UserInfo} from '@type/response-sub/user-sub';

// GET /user/info/[pk]
export interface UserInfoResponse {
  info: UserInfo;
  accessToken: string;
}
