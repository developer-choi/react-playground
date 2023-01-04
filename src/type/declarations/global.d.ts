import type {Kakao} from '@type/declarations/kakao';

export {};

declare global {
  interface Window extends Kakao {
    ignoreForceLogin: boolean | undefined;
  }
}
