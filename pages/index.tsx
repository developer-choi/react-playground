import React, {ComponentProps, useEffect, useRef} from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

const options = {
  autoPlay: true,
  controls: true,
  src: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
  type: 'application/x-mpegURL',
  width: '100vw',
  height: '100vh'
}

export default function Page() {
  return (
      <VideoPlayer2 {...options}/>
  );
}

//https://stackoverflow.com/questions/54837471/how-to-use-react-hooks-with-video-js
export function VideoPlayer2({src, ...rest}: ComponentProps<'video'>) {
  const playerRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const player = videojs(playerRef.current, { autoplay: true, muted: true }, () => {
      player.src(src as string);
    });
    
    return () => {
      player.dispose();
    };
  }, [src]);
  
  return (
      <div data-vjs-player>
        <video ref={playerRef} className="video-js vjs-16-9" playsInline {...rest}/>
      </div>
  );
}
