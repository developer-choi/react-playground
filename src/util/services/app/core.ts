import {isAndroid, isIOS} from 'react-device-detect';
import type {NativeAppInterfaceName} from '@type/declarations/native-app-interface';

// AOS, IOS 모두 같은 User Agent로 설정되어있다고 가정
const NATIVE_APP_USER_AGENT = 'MyApp';

function isOurApp() {
  return navigator.userAgent.includes(NATIVE_APP_USER_AGENT)
}

export function isOurAOSApp() {
  if (!isAndroid) {
    return false;
  }

  if(!isOurApp()) {
    console.error(`앱의 User Agent가 일치하지 않습니다. ${NATIVE_APP_USER_AGENT}이 맞는지 확인하세요.`, navigator.userAgent);
    return false;
  }

  return true;
}

export function isOurIOSApp() {
  if (!isIOS) {
    return false;
  }

  if(!isOurApp()) {
    console.error(`앱의 User Agent가 일치하지 않습니다. ${NATIVE_APP_USER_AGENT}이 맞는지 확인하세요.`, navigator.userAgent);
    return false;
  }

  return true;
}

type PlatformCallback<P> = (param: P) => void

interface WrapNativeAppParam<P> {
  callback: PlatformCallback<P>
  interfaceName: NativeAppInterfaceName
}

type WrapAOSAppParam<P> = WrapNativeAppParam<P> & {
  methodName: string
}

export function wrapNativeIOSCallback<P>({callback, interfaceName}: WrapNativeAppParam<P>): PlatformCallback<P> {
  return (param: P) => {
    if (!isOurIOSApp()) {
      return;
    }

    if (!(interfaceName in (window.webkit?.messageHandlers ?? {}))) {
      console.error(`IOS앱에 ${interfaceName}이름으로 등록된 인터페이스가 없습니다.`);
      return;
    }

    callback(param);
  }
}

export function wrapNativeAOSCallback<P>({callback, interfaceName, methodName}: WrapAOSAppParam<P>): PlatformCallback<P> {
  return (param: P) => {
    if (!isOurAOSApp()) {
      return;
    }

    if (!(interfaceName in window)) {
      console.error(`AOS앱에 ${interfaceName}이름으로 등록된 인터페이스가 없습니다.`);
      return;
    }

    if (!(methodName in window[interfaceName])) {
      console.error(`AOS앱에 ${interfaceName}인터페이스 안에 ${methodName}메소드가 존재하지않습니다.`);
      return;
    }

    callback(param);
  }
}
