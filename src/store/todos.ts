import {createAction, handleActions} from 'redux-actions';
import {getNumberArray} from '../utils/web-api-extend/number';

//Actions
const SET_TODOS = 'react-library/todos/SET_TODOS';
const SET_VISIBILITY = 'react-library/todos/SET_VISIBILITY';
const SET_DUMMY = 'react-library/todos/SET_DUMMY';

//Action Creators
export const setTodosActionCreator = createAction<Todo[]>(SET_TODOS);
export const setVisibilityActionCreator = createAction<boolean>(SET_VISIBILITY);
export const setDummyActionCreator = createAction(SET_DUMMY);

export interface Todo {
  id: number;
  text: string;
  visible: boolean;
}

//state and reducer
export interface TodosState {
  list: Todo[];
  visibilityFilter: boolean;
  dummy: boolean;
}

const initialState: TodosState = {
  list: getNumberArray(1, 6000000).map(value => ({
    id: value,
    text: `todo-text-${value}`.repeat(10000),
    visible: Math.random() > 0.5
  })),
  visibilityFilter: true,
  dummy: false
};

export const todos = handleActions<TodosState, any>({
  
  [SET_TODOS]: (state, action: ReturnType<typeof setTodosActionCreator>) => ({
    ...state,
    list: action.payload
  }),
  [SET_VISIBILITY]: (state, action: ReturnType<typeof setVisibilityActionCreator>) => ({
    ...state,
    visibilityFilter: action.payload
  }),
  [SET_DUMMY]: (state) => ({
    ...state,
    dummy: !state.dummy
  })
  
}, initialState);
