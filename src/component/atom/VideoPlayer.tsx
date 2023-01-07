import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import videojs, {VideoJsPlayer, VideoJsPlayerOptions} from 'video.js';
import Button from '@component/atom/element/Button';
import 'video.js/dist/video-js.css';
import {isMatchKeyboardEvent, KeyboardEventSpecialKey} from '@util/extend/browser/keyboard-event';

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
  const [player, setPlayer] = useState<VideoJsPlayer>();
  const [visibleUnMuteButton, setVisibleUnMuteButton] = useState(false);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const {controls = true, autoplay, ...rest} = options ?? {};
    const instance = videojs(videoRef.current, {autoplay, controls, ...rest}, () => {
      instance.src(src);

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
            await instance.play();
            setPlayer(instance);
          } catch (error) {
            if (error instanceof DOMException && error.name === 'NotAllowedError') {
              instance.muted(true);
              setVisibleUnMuteButton(true);
              setPlayer(instance);
            } else {
              console.error(error);
            }
          }
        }
      })().then();
    });

    return () => {
      instance.dispose();
    };
  }, [src, options]);

  const unmute = useCallback(() => {
    if (player) {
      setVisibleUnMuteButton(false);
      player.muted(false);
    }
  }, [player]);

  useMappingShortcut(player);

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

export interface PlayerKeyboardMethod {
  pause: () => void;
  play: () => void;
  playForward: () => void;
  playBackward: () => void;
  volumeUp: () => void;
  volumeDown: () => void;
}

export type ControlKey = ' ' | 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown';

export interface Shortcut {
  method: keyof PlayerKeyboardMethod;
  mapping: {
    key: ControlKey,
    matchSpecialKeys?: KeyboardEventSpecialKey[]
  };
}

const DEFAULT_SHORTCUTS: Shortcut[] = [
  {method: 'playForward', mapping: {key: 'ArrowRight'}},
  {method: 'playBackward', mapping: {key: 'ArrowLeft'}},
  {method: 'volumeUp', mapping: {key: 'ArrowUp'}},
  {method: 'volumeDown', mapping: {key: 'ArrowDown'}}
];

function useMappingShortcut(player?: VideoJsPlayer, shortcuts = DEFAULT_SHORTCUTS) {
  useEffect(() => {
    if (!player) {
      return;
    }

    const handler = (event: KeyboardEvent) => {

      if (isMatchKeyboardEvent(event, {key: ' '})) {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
        return;
      }

      shortcuts.forEach(({mapping, method}) => {
        if (isMatchKeyboardEvent(event, mapping)) {
          controlPlayer(player, method);
        }
      });
    };

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [shortcuts, player]);
}

const VOLUME_UNIT = 0.05;
const SEEKING_UNIT = 5;

function controlPlayer(player: VideoJsPlayer, method: keyof PlayerKeyboardMethod) {
  switch (method) {
    case 'playForward': {
      const duration = player.duration();
      const currentTime = player.currentTime();
      player.currentTime(duration <= currentTime ? duration : currentTime + SEEKING_UNIT);
      break;
    }
    case 'playBackward': {
      const currentTime = player.currentTime();
      player.currentTime(currentTime <= 0 ? 0 : currentTime - SEEKING_UNIT);
      break;
    }

    case 'volumeUp': {
      const volume = player.volume();
      player.volume(volume > 1 ? 1 : volume + VOLUME_UNIT);
      break;
    }

    case 'volumeDown':
      const volume = player.volume();
      player.volume(volume <= 0 ? 0 : volume - VOLUME_UNIT);
      break;
  }
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
