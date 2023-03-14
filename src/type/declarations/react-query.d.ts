import {DehydratedState} from '@tanstack/react-query';

declare module '@tanstack/react-query' {
  export interface DehydratedPageProps {
    dehydratedState: DehydratedState;
  }
}
