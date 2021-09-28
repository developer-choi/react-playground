import {all, put, takeEvery} from 'redux-saga/effects';
import {decreaseActionCreator, increaseActionCreator} from '../reducers/counter';
import {createAction} from '@reduxjs/toolkit';

function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

// Our worker Saga: will perform the async increment task
function* workIncrementAsync() {
  yield delay(200);
  yield put(increaseActionCreator());
}

// Our worker Saga: will perform the async increment task
function* workDecreaseAsync() {
  yield delay(200);
  yield put(decreaseActionCreator());
}

export const increaseAsyncActionCreator = createAction('count-saga/increaseAsync');
export const decreaseAsyncActionCreator = createAction('count-saga/decreaseAsync');

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncreaseAsync() {
  yield takeEvery(increaseAsyncActionCreator, workIncrementAsync)
}

function* watchDecreaseAsync() {
  yield takeEvery(decreaseAsyncActionCreator, workDecreaseAsync);
}

export default function* countSaga() {
  yield all([watchIncreaseAsync(), watchDecreaseAsync()]);
}

/** 네이밍규칙
 * 1. worker saga는 work[ACTION_TYPE]
 * 2. watcher saga는 watch[ACTION_TYPE]
 * 각각 앞에 work, watch라는 접두사를 붙이고 뒤에 action type을 작성한다.
 *
 * 3. rootSaga만 [FILE_NAME]Saga로 파일이름과 그 뒤에 Saga라는 접미사를 붙인다.
 * 4. export할 watcher saga가 1개밖에 없을경우 watcher saga를 rootSaga의 네이밍규칙과 동일하게 작성한다.
 */
