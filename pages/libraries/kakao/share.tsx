import React, {useCallback} from "react";
import Button from "@component/atom/element/Button";
import Script from "next/script";

const Page = () => {
  const onClick = () => {
    //@ts-ignore
    console.log('initialized', window.Kakao.isInitialized());
  };

  const onLoad = useCallback(() => {
    //@ts-ignore
    if (!window.Kakao) {
      console.error("Kakao not download");
      return;
    }

    //@ts-ignore
    if (!window.Kakao.isInitialized()) {
      console.log('kakao not initialized');
      //@ts-ignore
      window.Kakao.init("04f4aa5c974f27e7a29316e8b5188c0f");
    }

    //@ts-ignore
    console.log('initialized', window.Kakao.isInitialized());

    //@ts-ignore
    window.Kakao.Share.createDefaultButton({
      container: "#kakaotalk-sharing-btn",
      objectType: "commerce",
      content: {
        title: "[발렌시아가]여성지갑 - ATNY",
        imageUrl:
          "https://img.atny.com/data/goods/ATNY/99/2019399/014_0d623e4c-ff68-4b02-b923-ef14df91f449_view.JPG",
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          webUrl: "https://react-playground-eosin.vercel.app"
        }
      },
      commerce: {
        regularPrice: 2855105,
        discountRate: 18,
        discountPrice: 2360600
      },
      buttons: [
        {
          title: "구매하기",
          link: {
            webUrl: "https://react-playground-eosin.vercel.app/libraries/kakao/share-target",
            mobileWebUrl: "https://react-playground-eosin.vercel.app/libraries/kakao/share-target",
            androidExecutionParams: "https://react-playground-eosin.vercel.app/libraries/kakao/share-target",
            iosExecutionParams: "https://react-playground-eosin.vercel.app/libraries/kakao/share-target"
          }
        }
      ]
    });
  }, []);

  return (
    <div>
      <Button id="kakaotalk-sharing-btn" onClick={onClick}>Kakao Talk Share</Button>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous" onLoad={onLoad} />
    </div>
  );
};

export default Page;