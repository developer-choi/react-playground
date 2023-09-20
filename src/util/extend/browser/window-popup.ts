import {useCallback, useEffect} from 'react';

export interface PostMessage<D = any> {
  type: string;
  data: D;
}

// 나중에 Receiver 구현할 때 함수명('type' 으로 파일검색해서 어디서 post하는지 찾을 수 있도록 설계
export function windowPostMessage<D>(type: string, data: D, windowObject?: Window | undefined) {
  let _windowObject: Window;

  try {
    _windowObject = windowObject ?? window.opener;
  } catch (error) {
    // Reference Error
    return;
  }


  const message: PostMessage = {
    type,
    data
  };

  _windowObject.postMessage(message);
}

export interface UseWindowMessageParam<D = any> {
  type: string;
  receiveCallback: (data: D) => void;
}

export function useWindowMessageReceiver<D = any>(param: UseWindowMessageParam<D>) {
  const {type, receiveCallback} = param;

  const openNewWindow = useCallback((url: string, feature: WindowPopupFeatures = DEFAULT_WINDOW_FEATURES) => {
    const featureString = Object.entries(feature).map(([key, value]) => `${key}=${value}`).join(',');
    window.open(url, 'popup', featureString);
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const message: Partial<PostMessage> = event.data;

      if (message.type !== type) {
        return;
      }

      receiveCallback(message.data);
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  }, [receiveCallback, type]);

  return {
    openNewWindow
  };
}

export interface WindowPopupFeatures {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

const DEFAULT_WINDOW_FEATURES: WindowPopupFeatures = {
  width: 450,
  height: 750
};
