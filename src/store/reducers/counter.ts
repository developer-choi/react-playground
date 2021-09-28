import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0
};

const counterSlice = createSlice({
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

export const { increaseActionCreator, decreaseActionCreator } = counterSlice.actions;
export default counterSlice.reducer;
