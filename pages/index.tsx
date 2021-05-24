import React, {ComponentProps, useEffect, useRef} from 'react';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import styled from 'styled-components';

const options: VideoJsPlayerOptions = {
  autoplay: true,
  muted: true,
  controls: true,
  src: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8'
}

export default function Page() {
  return (
      <VideoPlayer options={options}/>
  );
}

export interface VideoPlayerProps {
  options: VideoJsPlayerOptions;
  videoProps?: ComponentProps<'video'>;
}

//https://stackoverflow.com/questions/54837471/how-to-use-react-hooks-with-video-js
export function VideoPlayer({videoProps, options}: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const {src, ...rest} = options;
    const player = videojs(playerRef.current, rest, () => {
      player.src(src as string);
    });
    
    return () => {
      player.dispose();
    };
  }, [options]);
  
  return (
      <Wrap>
        <div data-vjs-player>
          <video ref={playerRef} className="video-js vjs-16-9" playsInline {...videoProps}/>
        </div>
      </Wrap>
  );
}

const Wrap = styled.div`
  .vjs-big-play-button {
    display: none !important;
  }
`;
