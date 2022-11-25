import React, {createContext, memo, useCallback, useContext, useMemo, useState} from 'react';
import Button from '@component/atom/button/Button';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';

interface ContextValue {
  value: number;
}

const Context = createContext<ContextValue>({value: 0});

export default function UseContextPage() {
  const [count, setCount] = useState(0);
  
  const providerValue = useMemo<ContextValue>(() => ({
    value: count
  }), [count]);
  
  const increase = useCallback(() => {
    setCount(prevState => prevState + 1);
  }, []);
  
  const decrease = useCallback(() => {
    setCount(prevState => prevState - 1);
  }, []);
  
  const forceReRender = useForceReRender();
  
  return (
    <Context.Provider value={providerValue}>
      <Children/>
      <Button onClick={increase}>+</Button>
      <Button onClick={decrease}>-</Button>
      <Button onClick={forceReRender}>Force ReRender</Button>
    </Context.Provider>
  );
};

const Children = memo(function Children() {
  const {value} = useContext(Context);
  
  return (
      <span>{value}</span>
  );
});
