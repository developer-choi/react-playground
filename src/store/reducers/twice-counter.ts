import {createSlice} from "@reduxjs/toolkit";
import type {CounterState} from "@store/reducers/counter";

const initialState: CounterState = {
  count: 0
};

const twiceCounterSlice = createSlice({
  name: "twiceCounter",
  initialState,
  reducers: {
    increaseTwice: (state) => {
      state.count += 2;
    },
    decreaseTwice: (state) => {
      state.count -= 2;
    }
  }
});

export const {increaseTwice, decreaseTwice} = twiceCounterSlice.actions;
export default twiceCounterSlice.reducer;
