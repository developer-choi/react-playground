import {useCallback, useState} from "react";

export interface CounterParam {
  initial?: number;
  multiple?: number;
  log?: string;
}

export default function useCounter(params?: CounterParam) {
  const {initial = 0, multiple = 1, log = ""} = params ?? {};
  const [count, setCount] = useState(initial);

  const increase = useCallback(() => {
    setCount((prevState) => {
      const nextState = (prevState + 1) * multiple;

      if (log) {
        console.log(`increase-${prevState}-${log}`);
      }

      return nextState;
    });
  }, [log, multiple]);

  const decrease = useCallback(() => {
    setCount((prevState) => {
      const nextState = (prevState - 1) * multiple;

      if (log) {
        console.log(`decrease-${prevState}-${log}`);
      }

      return nextState;
    });
  }, [log, multiple]);

  return {
    count,
    increase,
    decrease
  };
}
