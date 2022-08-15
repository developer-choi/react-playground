import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {UserInfo} from '@type/response-sub/user-sub';

export interface UserState {
  info?: UserInfo;
}

const initialState: UserState = {
  info: undefined
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
