import createSagaMiddleware from 'redux-saga';
import countSaga from '@store/sagas/count-saga';
import userSaga from '@store/sagas/user-saga';
import {all} from 'redux-saga/effects';
import {configureStore} from '@reduxjs/toolkit';
import counter from '@store/reducers/counter';
import user from '@store/reducers/user';
import layout from '@store/reducers/layout';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter,
    user,
    layout
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      //https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      ignoredPaths: ['layout.headerProp.onClickHeader'], // Ignore state message
      ignoredActionPaths: ['payload.onClickHeader'] // Ignore dispatch action message
    }
  }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === 'development'
});

sagaMiddleware.run(function* () {
  yield all([countSaga(), userSaga()]);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
