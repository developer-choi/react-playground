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
  commerce: KakaoTalkCommerce;
  buttons: KakaoTalkButton[];
}

interface KakaoTalkButton {
  title: string;
  link: KakaoTalkButtonLink;
}

interface KakaoTalkButtonLink {
  webUrl: string;
  mobileWebUrl: string;
  androidExecutionParams: string;
  iosExecutionParams: string;
}

export type KakaoTalkCommerce = {
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