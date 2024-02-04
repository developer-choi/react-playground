import React from "react";
import Script from "next/script";
import Button from "@component/atom/element/Button";
import {useKakaoShare} from "@util/extend/kakao";

const Page = () => {
  const {shareStoryToKakaoStory, scriptProps} = useKakaoShare()

  return (
    <>
      <Button onClick={() => shareStoryToKakaoStory('https://www.youtube.com/watch?v=x6i3_LfeTjY')}>
        공유하기
      </Button>
      <Script {...scriptProps}/>
    </>
  );
};

export default Page;
