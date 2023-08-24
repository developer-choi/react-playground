export interface Kakao {
  Kakao: undefined | (KakaoShare & KakaoMethod);
}

interface KakaoMethod {
  isInitialized: () => boolean;
  init: (javascriptKey: string) => void;
}

export interface KakaoShare {
  Share: {
    sendDefault: (param: KakaoSendDefaultParam) => void;
  };
  Story: {
    share: (param: KakaoStoryShareParma) => void
  }
}

interface KakaoSendDefaultParam {
  objectType: 'commerce';
  content: {
    title: string;
    imageUrl: string;
    link: {
      webUrl: string;
    };
  };
  commerce: KakaoCommerce;
  buttons: KakaoButton[];
}

interface KakaoButton {
  title: string;
  link: KakaoButtonLink;
}

interface KakaoButtonLink {
  webUrl: string;
  mobileWebUrl: string;
  androidExecutionParams: string;
  iosExecutionParams: string;
}

export type KakaoCommerce = {
  regularPrice: number;
} | {
  regularPrice: number;
  discountRate: number;
  discountPrice: number;
}

interface KakaoStoryShareParma {
  url: string;
  text: string;
}