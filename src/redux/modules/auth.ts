import {createAction, handleActions} from "redux-actions";

//Actions
const SET_LOGINED = "react-library/auth/SET_LOGINED";

//Action Creators
export const setLogined = createAction<boolean>(SET_LOGINED);

//state and reducer
export interface AuthState {
    logined: boolean
}

const initialState: AuthState = {
    logined: false
};

export const reducer = handleActions<AuthState, any>({

    [SET_LOGINED]: (state, action: ReturnType<typeof setLogined>) => ({
        ...state,
        logined: action.payload
    }),

}, initialState);
