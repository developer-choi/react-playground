import createSagaMiddleware from 'redux-saga';
import countSaga from './sagas/count-saga';
import userSaga from './sagas/user-saga';
import {all} from 'redux-saga/effects';
import {configureStore} from '@reduxjs/toolkit';
import counter from '@store/reducers/counter';
import user from '@store/reducers/user';

// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {counter, user},
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
});

sagaMiddleware.run(function* () {
  yield all([countSaga(), userSaga()]);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
