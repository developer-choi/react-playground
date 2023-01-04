export interface Kakao {
  Kakao: undefined | (KakaoShare & KakaoMethod);
}

export interface KakaoMethod {
  isInitialized: () => boolean;
  init: (javascriptKey: string) => void;
}

export interface KakaoShare {
  Share: {
    createDefaultButton: (param: CreateDefaultButtonParam) => void;
  };
}

interface CreateDefaultButtonParam {
  container: string;
  objectType: 'commerce';
  content: {
    title: string;
    imageUrl: string;
    link: {
      webUrl: string;
    };
  };
  commerce: {
    regularPrice: number;
    discountRate: number;
    discountPrice: number;
  };
  buttons: {
    title: string;
    link: {
      webUrl: string;
      mobileWebUrl: string;
      androidExecutionParams: string;
      iosExecutionParams: string;
    };
  }[];
}
