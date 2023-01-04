import React, {useCallback, useEffect, useMemo, useState} from "react";
import Button from "@component/atom/element/Button";
import Script from "next/script";
import useCounter from "@util/custom-hooks/useCounter";
import type {ScriptProps} from "next/dist/client/script";
import env from "@util/env";

const Page = () => {
  const {increase, count} = useCounter();
  const {scriptProps, shareButtonId, initialized} = useKakaoShare({
    shareButtonId: "kakaotalk-sharing-btn",
    product: {
      title: `[발렌시아가]여성지갑 - ATNY"-${count}`,
      thumbnail: "https://img.atny.com/data/goods/ATNY/99/2019399/014_0d623e4c-ff68-4b02-b923-ef14df91f449_view.JPG",
      regularPrice: 2855105,
      discountRate: 18,
      discountPrice: 2360600,
      link: `/libraries/kakao/share-target?count=${count}`
    }
  });

  return (
    <div>
      <Button id={shareButtonId} disabled={!initialized}>Kakao Talk Share</Button>
      <Button onClick={increase}>Increase (current: {count})</Button>
      <Script {...scriptProps}/>
    </div>
  );
};

export interface KakaoShareParam {
  shareButtonId: string; // #제외
  product: {
    title: string;
    thumbnail: string;
    regularPrice: number;
    discountRate: number;
    discountPrice: number;
    link: string;
  };
}

export interface KakaoShareResult {
  scriptProps: ScriptProps;
  shareButtonId: string;
  initialized: boolean;
}

function useKakaoShare({shareButtonId, product}: KakaoShareParam): KakaoShareResult {
  const [initialized, setInitialized] = useState(false);

  const onLoad = useCallback(() => {
    //@ts-ignore
    if (!window.Kakao) {
      return;
    }

    //@ts-ignore
    if (!window.Kakao.isInitialized()) {
      //@ts-ignore
      window.Kakao.init(env.public.kakaoJavascriptKey);
      setInitialized(true);
    }

    //@ts-ignore
    console.log('initialized', window.Kakao.isInitialized());
  }, []);

  //https://developers.kakao.com/tool/demo/message/kakaolink?default_template=commerce
  const scriptProps: ScriptProps = useMemo(() => ({
    src: "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js",
    integrity: "sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx",
    crossOrigin: "anonymous",
    onLoad
  }), [onLoad]);

  const {regularPrice, discountPrice, discountRate, thumbnail, link, title} = product;

  useEffect(() => {
    if (!initialized) {
      return;
    }

    const resultUrl = env.public.origin + link;

    //@ts-ignore
    window.Kakao.Share.createDefaultButton({
      container: `#${shareButtonId}`,
      objectType: "commerce",
      content: {
        title: title,
        imageUrl: thumbnail,
        link: {
          webUrl: env.public.origin
        }
      },
      commerce: {
        regularPrice,
        discountRate,
        discountPrice
      },
      buttons: [
        {
          title: "구매하기",
          link: {
            webUrl: resultUrl,
            mobileWebUrl: resultUrl,
            androidExecutionParams: resultUrl,
            iosExecutionParams: resultUrl
          }
        }
      ]
    });
  }, [initialized, shareButtonId, regularPrice, discountPrice, discountRate, thumbnail, link, title]);

  return {
    scriptProps,
    shareButtonId: shareButtonId,
    initialized
  };
}

export default Page;