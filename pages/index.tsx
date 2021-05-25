import React, {useEffect, useRef} from 'react';
import videojs, {VideoJsPlayer, VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import styled from 'styled-components';
import { Button } from '@components/atom/button/button-presets';

export default function Page() {
  return (
      <VideoPlayer autoplay src="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"/>
  );
}

export interface VideoPlayerProps extends VideoJsPlayerOptions {
  src: string;
}

//https://stackoverflow.com/questions/54837471/how-to-use-react-hooks-with-video-js
export function VideoPlayer({src, ...options}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer>();
  const [visibleUnMuteButton, setVisibleUnMuteButton] = React.useState(false);
  
  useEffect(() => {
    const {controls = true, autoplay, ...rest} = options;
    const player = videojs(videoRef.current, {autoplay, controls, ...rest}, () => {
      player.src(src as string);
  
      (async () => {
  
        /**
         * 크롬 자동재생 정책에 따라,
         * 자동재생이 실패할경우 mute를 true로 하여 항상 자동재생 자체는 성공할 수 있도록 구현.
         */
        if (autoplay) {
          try {
            await player.play();
          } catch (error) {
            if (error instanceof DOMException && error.name === 'NotAllowedError') {
              player.muted(true);
              setVisibleUnMuteButton(true);
            } else {
              console.error(error);
            }
  
            alert(error);
          }
        }
        
      })().then();
      
      return () => {
        player.dispose();
      };
    });
  
    playerRef.current = player;
  }, [src, options]);
  
  const unmute = React.useCallback(() => {
    setVisibleUnMuteButton(false);
    playerRef.current?.muted(false);
  }, []);
  return (
      <VideojsResetWrap>
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-16-9" playsInline/>
        </div>
        {visibleUnMuteButton &&
        <UnMuteWrap onClick={unmute}>
          <UnMuteButton>탭하여 음소거 해제</UnMuteButton>
        </UnMuteWrap>
        }
      </VideojsResetWrap>
  );
}

const VideojsResetWrap = styled.div`
  position: relative;
  
  .video-js.vjs-controls-enabled {
    cursor: pointer;
  }
  
  .vjs-big-play-button {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const UnMuteWrap = styled.div`
  cursor: pointer;
  
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const UnMuteButton = styled(Button)`
  position: absolute;
  left: 5px;
  top: 5px;
`;
