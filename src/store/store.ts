import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {counter} from './reducers/counter';
import countSaga from './sagas/count-saga';
import userSaga from './sagas/user-saga';
import {user} from './reducers/user';
import {all} from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers({counter, user});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(function* () {
  yield all([countSaga(), userSaga()]);
});
