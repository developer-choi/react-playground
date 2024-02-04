import type {NativeAppInterfaceName} from '@type/declarations/native-app-interface';
import {wrapNativeAOSCallback, wrapNativeIOSCallback} from '@util/services/app/core';

/**
 * 인터페이스 이름 = Some
 * 메소드 이름 = hehave
 * 라고 가정
 */
const INTERFACE_NAME: NativeAppInterfaceName = 'Some'

export interface BehaveParam {
  data1: string;
  data2: string;
}

export const behaveInAOS = wrapNativeAOSCallback({
  interfaceName: INTERFACE_NAME,
  methodName: 'behave',
  callback: ({data1, data2}: BehaveParam) => {
    window.Some.behave({data1, data2})
  },
});

export const behaveInIOS = wrapNativeIOSCallback({
  interfaceName: INTERFACE_NAME,
  callback: ({data1, data2}: BehaveParam) => {
    window.webkit?.messageHandlers.Some?.postMessage(`${data1}-${data2}`);
  },
});
