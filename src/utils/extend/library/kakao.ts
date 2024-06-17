import type {ScriptProps} from 'next/dist/client/script';
import {useCallback, useMemo, useState} from 'react';
import env from '@/utils/env';
import {KakaoTalkCommerce} from '@/type/declaration/kakao';

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
  };
}

export function useKakaoShare() {
  const {kakaoMethods, scriptProps} = useKakaoInit();

  const shareProductToKakaoTalk = useCallback((product: ProductToShareKakao) => {
    if (!kakaoMethods) {
      return;
    }

    const {regularPrice, discountPrice, discountRate, thumbnail, pk, title} = product;

    const resultUrl = env.public.origin + `/solution/kakao/share-target?pk=${pk}`;

    kakaoMethods.Share.sendDefault({
      objectType: 'commerce',
      content: {
        title: title,
        imageUrl: thumbnail,

        /**
         * 카카오개발자센터에 등록한 도메인중에 하나여야함
         * 4개 다 링크 지정해야 썸네일클릭, 제목클릭했을 때
         * 링크가 아래 구매하기버튼으로 감.
         */
        link: {
          webUrl: resultUrl,
          mobileWebUrl: resultUrl,
          androidExecutionParams: resultUrl,
          iosExecutionParams: resultUrl
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
    shareProductToKakaoTalk,
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

function commerce({regularPrice, discountPrice, discountRate}: Pick<ProductToShareKakao, 'regularPrice' | 'discountRate' | 'discountPrice'>): KakaoTalkCommerce {
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
