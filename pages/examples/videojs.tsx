import React from 'react';
import Head from 'next/head';
import {VideoPlayer} from '@components/atom/VideoPlayer';

/**
 * 발생하는 문제
 *
 * 1. VideoPlayer를 렌더링하는 페이지는 GlobalStyle이 적용되지않음 (_app에서 분명 적용했고, 다른 페이지는 정상적으로 나오지만...)
 * 2. 이 페이지가 Production에서는 영상이 나오지않음. (next dev로는 나오지만 next build 후에 next start하면 안나옴)
 */
export default function VideojsPage() {
  
  return (
      <>
        <Head>
          <title>videojs</title>
        </Head>
        <div>
          <VideoPlayer autoplay src="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"/>
        </div>
      </>
  );
}
