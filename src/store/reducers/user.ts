import {createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import type {UserInfo} from '@type/response-sub/user-sub';
import type {RootState} from '@store/store';
import UserApi from '@api/UserApi';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import {getLoginTokenClientSide} from '@util/services/auth/auth';
import {AuthError} from '@util/services/auth/AuthError';

export interface UserState {
  /**
   * INITIAL_USER_INFO: 로그인 여부 아직모르는 상태
   * undefined: 로그인 안되어있음.
   */
  info?: UserInfo;
}

export const INITIAL_USER_INFO: UserInfo = {
  name: '',
  userPk: 0
}

const initialState: UserState = {
  info: INITIAL_USER_INFO
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserActionCreator: (state, {payload}: PayloadAction<UserInfo | undefined>) => {
      state.info = payload;
    }
  }
});

export const {setUserActionCreator} = userSlice.actions;
export default userSlice.reducer;

export function thunkRefreshSetUser(): ThunkAction<void, RootState, undefined, ReturnType<typeof setUserActionCreator>> {
  return async function (dispatch) {
    try {
      const loginToken = getLoginTokenClientSide();
      const api = new UserApi();
      const {data: {info}} = await api.getUser(loginToken.userPk);
      dispatch(setUserActionCreator(info));
    } catch (error) {
      if (error instanceof AuthError) {
        dispatch(setUserActionCreator(undefined));
        return;
      }

      handleServerSideError(error);
    }
  };
}
