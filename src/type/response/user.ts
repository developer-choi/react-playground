import type {UserInfo} from '@type/response-sub/user-sub';

// GET /login
// GET /user
export interface UserInfoResponse {
  info: UserInfo;
}
