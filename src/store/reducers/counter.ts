import {createAction, handleActions} from 'redux-actions';

const INCREASE = 'react-playground/count-saga/INCREASE';
const DECREASE = 'react-playground/count-saga/DECREASE';

export const increaseActionCreator = createAction(INCREASE);
export const decreaseActionCreator = createAction(DECREASE);

//state and reducer
export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0
};

export const counter = handleActions<CounterState, any>({
  
  [INCREASE]: (state) => ({
    count: state.count + 1
  }),
  
  [DECREASE]: (state) => ({
    count: state.count - 1
  })
  
}, initialState);
