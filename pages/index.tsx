import React from 'react';
import 'video.js/dist/video-js.css';
import ReactPlayer from 'react-player';

const src = 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8';

export default function Page() {
  return (
      <>
        <CustomPlayer muted/>
        <CustomPlayer muted={false}/>
      </>
  );
}

function CustomPlayer({muted}: {muted: boolean}) {
  
  return (
      <ReactPlayer
          url={src}
          controls
          muted={muted}
          playing
          config={{
            file: { forceHLS: true },
          }}
      />
  );
}
