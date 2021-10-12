import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0
};

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increaseActionCreator: state => {
      state.count++;
    },
    decreaseActionCreator: state => {
      state.count--;
    }
  }
});

export const { increaseActionCreator, decreaseActionCreator } = slice.actions;
export default slice.reducer;
