import {configureStore} from '@reduxjs/toolkit';
import layout from '@store/reducers/layout';
import counter from '@store/reducers/counter';
import twiceCounter from '@store/reducers/twice-counter';
import modal from '@store/reducers/modal';
import loadingLayer from "@store/reducers/loading-layer";

export const store = configureStore({
  reducer: {
    layout,
    counter,
    twiceCounter,
    modal,
    loadingLayer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      //https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      ignoredPaths: ['layout.headerProp.onClickHeader', 'modal.modals'], // Ignore state message
      ignoredActionPaths: ['payload.onClickHeader', 'payload.Component', 'payload.props.closeDuringOneDay'] // Ignore dispatch action message
    }
  }),
  devTools: process.env.NODE_ENV === 'development'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
