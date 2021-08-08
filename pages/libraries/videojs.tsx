import React from 'react';
import Head from 'next/head';
import {VideoPlayer} from '@components/atom/VideoPlayer';

export default function VideojsPage() {
  
  return (
      <>
        <Head>
          <title>videojs</title>
        </Head>
        <div>
          <VideoPlayer options={OPTIONS} src="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"/>
        </div>
      </>
  );
}

const OPTIONS = {
  autoplay: true
};
