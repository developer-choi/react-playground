import {createAction, handleActions} from 'redux-actions';

const FORCE_UPDATE_STORE = 'react-library/toggle/FORCE_UPDATE_STORE';

export const forceUpdateStoreActionCreator = createAction(FORCE_UPDATE_STORE);

export interface ToggleState {
  bool: boolean;
}

const initialState: ToggleState = {
  bool: false
};

export const toggle = handleActions<ToggleState, any>({
  
  [FORCE_UPDATE_STORE]: (state) => ({
    bool: !state.bool
  }),
  
}, initialState);
