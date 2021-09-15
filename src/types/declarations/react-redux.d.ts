import { rootReducer } from '@store/store';

declare module 'react-redux' {
  export interface DefaultRootState extends ReturnType<typeof rootReducer> {
  }
}
