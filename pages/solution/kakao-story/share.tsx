import React from "react";
import {useKakaoStoryShare} from "@util/extend/kakao";
import Script from "next/script";
import Button from "@component/atom/element/Button";

const Page = () => {
  const {shareStory, scriptProps} = useKakaoStoryShare()

  return (
    <>
      <Button onClick={() => shareStory('https://www.youtube.com/watch?v=x6i3_LfeTjY')}>
        공유하기
      </Button>
      <Script {...scriptProps}/>
    </>
  );
};

export default Page;
