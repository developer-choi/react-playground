import {call, put, takeEvery} from 'redux-saga/effects';
import {createAction} from 'redux-actions';
import {apiGetHelloUser} from '../../api/hello';
import {setUserActionCreator} from '../reducers/user';

const REQUEST_FETCH_USER = 'react-library/user-saga/REQUEST_FETCH_USER';
export const requestFetchUserActionCreator = createAction<number>(REQUEST_FETCH_USER);

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
  yield takeEvery(REQUEST_FETCH_USER, workRequestFetchUser);
}
