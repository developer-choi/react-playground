import {all, put, takeEvery} from 'redux-saga/effects';
import {decreaseActionCreator, increaseActionCreator} from '../reducers/counter';
import {createAction} from 'redux-actions';

const INCREASE_ASYNC = 'react-library/count-saga/INCREASE_ASYNC';
const DECREASE_ASYNC = 'react-library/count-saga/DECREASE_ASYNC';

export const increaseAsyncActionCreator = createAction(INCREASE_ASYNC);
export const decreaseAsyncActionCreator = createAction(DECREASE_ASYNC);

function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

// Our worker Saga: will perform the async increment task
function* incrementAsyncSaga() {
  yield delay(1000);
  yield put(increaseActionCreator());
}

// Our worker Saga: will perform the async increment task
function* decreaseAsyncSaga() {
  yield delay(1000);
  yield put(decreaseActionCreator());
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* increaseSaga() {
  yield takeEvery(INCREASE_ASYNC, incrementAsyncSaga)
}

function* decreaseSaga() {
  yield takeEvery(DECREASE_ASYNC, decreaseAsyncSaga);
}

export default function* countSaga() {
  yield all([increaseSaga(), decreaseSaga()]);
}
