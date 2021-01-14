import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {todos} from './todos';

const rootReducer = combineReducers({todos});
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
