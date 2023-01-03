import React from "react";
import Button from "@component/atom/element/Button";
import Script from "next/script";

const Page = () => {
  const onClick = () => {
    //@ts-ignore
    console.log("onClick", window.Kakao);
    //@ts-ignore
    window.Kakao.Share.createDefaultButton({
      container: "#kakaotalk-sharing-btn",
      objectType: "commerce",
      content: {
        title: "언제 어디든, 더 쉽고 편하게 당신의 일상을 더 즐겁게, 헤이 라이언의 이야기를 들려드릴게요.",
        imageUrl:
          "http://k.kakaocdn.net/dn/dScJiJ/btqB3cwK1Hi/pv5qHVwetz5RZfPZR3C5K1/kakaolink40_original.png",
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: "https://react-playground-eosin.vercel.app",
          webUrl: "https://react-playground-eosin.vercel.app"
        }
      },
      commerce: {
        productName: "카카오미니",
        regularPrice: 100000,
        discountRate: 10,
        discountPrice: 90000
      },
      buttons: [
        {
          title: "구매하기",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com"
          }
        },
        {
          title: "공유하기",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com"
          }
        }
      ]
    });
  };

  return (
    <div>
      <Button id="kakaotalk-sharing-btn" onClick={onClick}>Kakao Talk Share</Button>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous" onLoad={() => {
        //@ts-ignore
        window.Kakao.init("04f4aa5c974f27e7a29316e8b5188c0f");
      }} />
    </div>
  );
};

export default Page;