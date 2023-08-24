import type {ScriptProps} from 'next/dist/client/script';
import {useCallback, useMemo, useState} from 'react';
import env from '@util/env';
import type {KakaoCommerce} from '@type/declarations/kakao';

export function useKakaoInit() {
  const [initialized, setInitialized] = useState(false);

  const onLoad = useCallback(() => {
    if (!window.Kakao) {
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(env.public.kakaoJavascriptKey as string);
      setInitialized(true);
    }

    console.log('initialized', window.Kakao.isInitialized());
  }, []);

  //https://developers.kakao.com/tool/demo/message/kakaolink?default_template=commerce
  const scriptProps: ScriptProps = useMemo(() => ({
    src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js',
    integrity: 'sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx',
    crossOrigin: 'anonymous',
    onLoad
  }), [onLoad]);
  
  return {
    kakaoMethods: !initialized || !window.Kakao ? null : window.Kakao,
    scriptProps
  }
}

export interface KakaoShareResult {
  scriptProps: ScriptProps;
  shareProduct: (product: ProductToShareKakao) => void
}

export default function useKakaoShare(): KakaoShareResult {
  const {kakaoMethods, scriptProps} = useKakaoInit()
  
  const onShare = useCallback((product: ProductToShareKakao) => {
    if (!kakaoMethods) {
      return
    }

    const {regularPrice, discountPrice, discountRate, thumbnail, pk, title} = product;
    
    const resultUrl = env.public.origin + `/study/kakao/share-target?pk=${pk}`;

    kakaoMethods.Share.sendDefault({
      objectType: 'commerce',
      content: {
        title: title,
        imageUrl: thumbnail,
        //카카오개발자센터에 등록한 도메인중에 하나여야함
        link: {
          webUrl: env.public.origin
        }
      },
      commerce: commerce({regularPrice, discountPrice, discountRate}),
      buttons: [
        {
          title: '구매하기',
          link: {
            webUrl: resultUrl,
            mobileWebUrl: resultUrl,
            androidExecutionParams: resultUrl,
            iosExecutionParams: resultUrl
          }
        }
      ]
    });
  }, [kakaoMethods]);

  return {
    scriptProps,
    shareProduct: onShare,
  };
}

export interface ProductToShareKakao {
  title: string;
  thumbnail: string;
  regularPrice: number;
  discountRate?: number;
  discountPrice?: number;
  pk: number;
}

function commerce({regularPrice, discountPrice, discountRate}: Pick<ProductToShareKakao, 'regularPrice' | 'discountRate' | 'discountPrice'>): KakaoCommerce {
  if (discountPrice && discountRate) {
    return {
      regularPrice,
      discountPrice, 
      discountRate
    };
    
  } else {
    return {
      regularPrice
    };
  }
}
