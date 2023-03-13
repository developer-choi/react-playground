import {DehydratedState} from '@tanstack/react-query';

declare module '@tanstack/react-query' {
  export interface DehydratedStateProps {
    dehydratedState: DehydratedState;
  }

  export type WithDehydratedStateProps<T> = T & DehydratedStateProps;
}
