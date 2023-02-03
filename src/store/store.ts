import {configureStore} from '@reduxjs/toolkit';
import user from '@store/reducers/user';
import layout from '@store/reducers/layout';
import counter from '@store/reducers/counter';

export const store = configureStore({
  reducer: {
    user,
    layout,
    counter
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      //https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      ignoredPaths: ['layout.headerProp.onClickHeader'], // Ignore state message
      ignoredActionPaths: ['payload.onClickHeader'] // Ignore dispatch action message
    }
  }),
  devTools: process.env.NODE_ENV === 'development'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
