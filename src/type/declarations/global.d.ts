import type {Kakao} from '@type/declarations/kakao';
import type {FunctionForNativeApp, NativeAppInterface} from '@type/declarations/native-app-interface';

export {};

declare global {
  interface Window extends Kakao, NativeAppInterface, FunctionForNativeApp {

  }
}
