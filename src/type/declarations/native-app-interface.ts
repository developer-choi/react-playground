//AOS, IOS 인터페이스 이름이 양쪽 플랫폼 모두 통일되어있다고 가정
export type NativeAppInterfaceName = 'Some';

//네이티브 앱에서 웹에 구현된 함수를 호출하기위한 타입. (윈도우 객체에 함수 집어넣고, 앱에서 호출할 수 있도록 하며, 이에대한 타입을 지정함)
export interface FunctionForNativeApp {
  someFunction?: () => void; //윈도우 객체안에 함수 집어넣는 시점과, 호출하는 시점의 차이에 따라 없을 수 있어서 Optional 타입
}

//웹에서 네이티브앱에 구현된 메소드목록에 대한 타입임. (웹에서 네이티브에 구현된 메소드 호출할 때 사용)
export type NativeAppInterface = IOSAppInterface & AOSAppInterface

interface IOSAppInterface {
  webkit?: {
    messageHandlers: Record<NativeAppInterfaceName, undefined | {
      postMessage: (value: any) => void
    }>
  };
}

type AOSAppInterface = Record<NativeAppInterfaceName, any>
