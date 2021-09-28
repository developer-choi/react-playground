import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  name?: string;
}

const initialState: UserState = {
  name: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserActionCreator: (state, { payload }) => {
      state.name = payload;
    }
  }
});

export const { setUserActionCreator } = userSlice.actions;
export default userSlice.reducer;
