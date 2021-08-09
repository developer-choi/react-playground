import {createAction, handleActions} from 'redux-actions';

const SET_USER = 'react-playground/user/SET_USER';

export const setUserActionCreator = createAction<string>(SET_USER);

export interface UserState {
  name?: string;
}

const initialState: UserState = {
  name: undefined
};

export const user = handleActions<UserState, any>({
  
  [SET_USER]: (state, action: ReturnType<typeof setUserActionCreator>) => ({
    name: action.payload
  }),
  
}, initialState);
