import {call, put, takeEvery} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {setUserActionCreator} from '@store/reducers/user';
import {makeRandomString} from '@util/extend/random';

export const requestFetchUserActionCreator = createAction<number>('react-playground/user-saga/REQUEST_FETCH_USER');

export async function apiGetHelloUser(userPk: number) {
  console.log('api call parameter', userPk);
  return {
    name: makeRandomString(['a', 'b', 'c'], 5),
  };
}

function* workRequestFetchUser(action: ReturnType<typeof requestFetchUserActionCreator>) {
  try {
    //@ts-ignore
    const user = yield call(apiGetHelloUser, action.payload);
    yield put(setUserActionCreator(user.name));
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeEvery(requestFetchUserActionCreator, workRequestFetchUser);
}
