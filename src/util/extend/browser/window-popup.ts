import {useCallback, useEffect} from 'react';

export interface PostMessage<D = any> {
  type: string;
  data: D;
}

// 나중에 Receiver 구현할 때 함수명('type' 으로 파일검색해서 어디서 post하는지 찾을 수 있도록 설계
export function windowPostMessage<D>(type: string, data: D, windowObject: Window = window.opener) {
  const message: PostMessage = {
    type,
    data
  };

  windowObject.postMessage(message);
}

export interface UseWindowMessageParam<D = any> {
  type: string;
  receiveCallback: (data: D) => void;
}

export function useWindowMessageReceiver<D = any>(param: UseWindowMessageParam<D>) {
  const {type, receiveCallback} = param;

  const openNewWindow = useCallback((url: string, feature?: WindowPopupFeatures) => {
    const height = feature?.height ?? DEFAULT_WINDOW_FEATURES.height;
    const width = feature?.width ?? DEFAULT_WINDOW_FEATURES.width;
    const top = feature?.top ?? (window.innerHeight - height) / 2;
    const left = feature?.left ?? (window.innerWidth - width) / 2;

    const featureString = Object.entries({height, width, top, left}).map(([key, value]) => `${key}=${value}`).join(',');
    window.open(url, '_blank', featureString);
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

const DEFAULT_WINDOW_FEATURES: Required<Pick<WindowPopupFeatures, 'width' | 'height'>> = {
  width: 450,
  height: 750
};
