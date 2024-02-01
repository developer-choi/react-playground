import type {GetNextPageParamFunction} from "@tanstack/react-query";

export function safeUpdateCallback<T>(callback: (prevValue: T) => T) {
  return function (prevValue: T | undefined): T | undefined {
    if (prevValue === undefined) {
      return prevValue;
    }

    try {
      return callback(prevValue);
    } catch (error) {
      console.error("Fail to update. Returned prevValue.", error, prevValue);
      return prevValue;
    }
  };
}

export type InfiniteQueryPageData = {
  nextPage: number | undefined;
};

export const getNextPageParam: GetNextPageParamFunction<InfiniteQueryPageData> = ({nextPage}) => {
  return nextPage;
};
