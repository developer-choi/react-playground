import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {BasicButton} from '../../components/styled/buttons';
import {setDummyActionCreator, setVisibilityActionCreator} from '../../store/todos';
import {FlexDirectionColumn} from '../../utils/style/css';
import {createSelector} from 'reselect';

function getVisibilityFilter(state: RootState) {
  return state.todos.visibilityFilter;
}

function getTodos(state: RootState) {
  return state.todos.list;
}

function getVisibleTodosOriginalSelector(state: RootState) {
  console.log('getVisibleTodosOriginalSelector call');
  const visibilityFilter = state.todos.visibilityFilter;
  return state.todos.list.filter(({visible}) => visible === visibilityFilter)
}

export const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
      console.log('getVisibleTodos call');
      return todos.filter(({visible}) => visible === visibilityFilter);
    }
);

function logger(prefix: string) {
  return console.log(`${prefix} ${moment().format('HH:mm:ss:SSSS')}`);
}

export default function Home() {
  
  const dispatch = useDispatch();
  const todos = useSelector<RootState, ReturnType<typeof getVisibleTodosOriginalSelector>>(getVisibleTodosOriginalSelector);
  // const todos = useSelector<RootState, ReturnType<typeof getVisibleTodos>>(getVisibleTodos);
  const visibilityFilter = useSelector<RootState, ReturnType<typeof getVisibilityFilter>>(getVisibilityFilter);
  
  const toggleVisibilityFilter = useCallback(() => {
    logger('toggle dispatch');
    dispatch(setVisibilityActionCreator(!visibilityFilter));
  }, [dispatch, visibilityFilter]);
  
  const toggleDummy = useCallback(() => {
    logger('toggle dummy');
    dispatch(setDummyActionCreator());
  }, [dispatch]);
  
  useEffect(() => {
    logger('useEffect call');
  });
  
  return (
      <HomeStyle>
        {visibilityFilter ? 'visible' : 'invisible'} todo length: {todos.length}
        <ToggleButton onClick={toggleVisibilityFilter}>Toggle Visibility Filter</ToggleButton>
        <ToggleButton onClick={toggleDummy}>Toggle Dummy</ToggleButton>
      </HomeStyle>
  );
}

const HomeStyle = styled.div`
  padding: 30px;
  ${FlexDirectionColumn};
`;

const ToggleButton = styled(BasicButton)`
  padding: 10px;
  background-color: ${props => props.theme.main};
  color: white;
  width: 200px;
  margin-top: 20px;
`;
