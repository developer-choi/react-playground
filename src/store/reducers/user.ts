import {createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import type {UserInfo} from '@type/response-sub/user-sub';
import type {RootState} from '@store/store';
import UserApi from '@api/UserApi';
import {handleServerSideError} from '@util/handle-error/server-side-error';
import {getLoginTokenClientSide} from '@util/auth/auth';

export interface UserState {
  info: UserInfo;
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
    setUserActionCreator: (state, {payload}: PayloadAction<UserInfo>) => {
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
      handleServerSideError(error);
    }
  };
}
