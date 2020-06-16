import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer as counter} from "./modules/counter";
import {reducer as twiceCounter} from "./modules/twiceCounter";
import {reducer as auth} from "./modules/auth";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";

const rootReducer = combineReducers({
    counter,
    twiceCounter,
    auth
});

export type RootState = ReturnType<typeof rootReducer>

//@ts-ignore
export const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, devTools, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

