import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import videojs, {VideoJsPlayer, VideoJsPlayerOptions} from 'video.js';
import {Button} from '@components/atom/button/button-presets';
import 'video.js/dist/video-js.css';

export interface VideoPlayerProps extends VideoJsPlayerOptions {
  src: string;
  options?: VideoJsPlayerOptions;
}

/**
 * 예제 : https://stackoverflow.com/questions/54837471/how-to-use-react-hooks-with-video-js보고 작성
 *
 * 발생하는 문제
 *
 * 1. VideoPlayer를 렌더링하는 페이지는 GlobalStyle이 적용되지않음 (_app에서 분명 적용했고, 다른 페이지는 정상적으로 나오지만...)
 * 2. 이 페이지가 Production에서는 영상이 나오지않음. (next dev로는 나오지만 next build 후에 next start하면 안나옴)
 */

/**
 * chrome autoplay policy : https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
 *
 * The point)
 * 1. If true, it will always play automatically.
 * 2. If the above condition (1) is not satisfied, it will be automatically played if the user interacts with it.
 * (If you click the link with the mouse and enter the web page with the video, it will be automatically played.
 * If you enter the web page with the URL in the address bar, it will not play automatically)
 *
 * IOS autoplay policy : https://developer.apple.com/documentation/webkit/delivering_video_content_for_safari
 *
 * The point)
 * 1. If true, it will always play automatically.
 * 2. When you press the home button to go to the home screen and then turn on the web browser again, it does not automatically play.
 * (= because the video has disappeared from the viewport)
 *
 * Related stackoverflow link : https://stackoverflow.com/questions/43570460/html5-video-autoplay-on-iphone#answer-49137124
 *
 * The point)
 * 1. If it is in low power mode, auto play is not possible.
 */
export function VideoPlayer({src, options}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer>();
  const [visibleUnMuteButton, setVisibleUnMuteButton] = useState(false);
  
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    
    const {controls = true, autoplay, ...rest} = options ?? {};
    const player = videojs(videoRef.current, {autoplay, controls, ...rest}, () => {
      player.src(src);
      
      (async () => {
        
        /**
         * 크롬 자동재생 정책에 따라,
         * 자동재생이 실패할경우 mute를 true로 하여 항상 자동재생 자체는 성공할 수 있도록 구현.
         * ==>
         * IOS에 한해 저전력모드를 킨 경우, 자동재생이 안됨. 유튜브에서 조차도.
         * 그런데 이 경우에 대해 음소거를 하면서까지 자동재생을 하는게 맞는 동작인지는 판단이 서지않음.
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
          }
        }
      })().then();
    });
    
    playerRef.current = player;
    
    return () => {
      player.dispose();
    };
  }, [src, options]);
  
  const unmute = useCallback(() => {
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
