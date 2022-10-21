import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import useIsFirstRender from '@util/custom-hooks/useIsFirstRender';
import {randomNumber} from '@util/extend/random';

export default function Page() {
  
  const [sort, setSort] = useState<'desc' | 'asc'>('desc');
  
  const sortedTodos = useMemo<TodoType[]>(() => {
  
    if(sort === 'desc') {
      return todos.sort((a, b) => a.key - b.key);
    } else {
      return todos.sort((a, b) => b.key - a.key);
    }
    
  }, [sort]);
  
  const changeSort = useCallback(() => {
    setSort(prevState => prevState === 'desc' ? 'asc' : 'desc');
  }, []);
  
  return (
    <Wrap>
      <Button style={{marginRight: 5}} onClick={changeSort}>정렬변경</Button>
      <Ul>
        {/*<WorstTodos todos={sortedTodos}/>*/}
        {/*<NormalTodos todos={sortedTodos}/>*/}
        <BestTodos todos={sortedTodos}/>
      </Ul>
    </Wrap>
  );
};

interface TodosProp {
  todos: TodoType[];
}

function WorstTodos({todos}: TodosProp) {
  return (
    <>
      {todos.map(({text}) => (
        <Todo key={randomNumber(1, 9999)} text={text}/>
      ))}
    </>
  )
}

function NormalTodos({todos}: TodosProp) {
  return (
    <>
      {todos.map(({text}, index) => (
        <Todo key={index} text={text}/>
      ))}
    </>
  )
}

function BestTodos({todos}: TodosProp) {
  return (
    <>
      {todos.map(({text, key}) => (
        <Todo key={key} text={text}/>
      ))}
    </>
  )
}

function Todo({text}: TodoType) {
  
  const initialText = useRef(text);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    console.log(text, 'mounted');
  
    return () => {
      console.log(text, 'unmounted');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    console.log(initialText.current, text, 'updated');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  
  return (
    <li>{text}</li>
  );
}

const Wrap = styled.div`
  padding: 15px;
`;

const Button = styled.button`
  background: ${props => props.theme.main};
  color: white;
  
  width: 90px;
  height: 30px;
`;

const Ul = styled.ul`
  list-style: initial;
  margin-left: 20px;
  margin-top: 10px;
`;

interface TodoType {
  key: number;
  text: string;
}

const todos: TodoType[] = [
  {
    key: 1,
    text: '할일1'
  },
  {
    key: 2,
    text: '할일2'
  },
  {
    key: 3,
    text: '할일3'
  },
  {
    key: 4,
    text: '할일4'
  }
];
