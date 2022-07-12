import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import InputText from '@component/extend/InputText';
import {useKeyDown} from '@util/custom-hooks/useKeyDown';
import type {MatchKeyboardEvent} from '@util/extend/keyboard-event';
import {EMPTY_ARRAY} from '@util/extend/array';
import {isVideoInFullscreen} from '@util/extend/document';

export default function WindowKeyDownPage() {
  
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useKeyDown(SLASH_KEYBOARD_EVENT, useCallback(event => {
    inputRef.current?.focus();
    event.preventDefault();
  }, []));
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useKeyDown(MUTE_TOGGLE_KEYBOARD_EVENT, useCallback(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.muted = !videoElement.muted;
    }
  }, []));
  
  useKeyDown(FULLSCREEN_TOGGLE_KEYBOARD_EVENT, useCallback(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
  
      if (isVideoInFullscreen()) {
        document.exitFullscreen().then();
      } else {
        videoElement.requestFullscreen().then();
      }
    }
  }, []));
  
  
  
  return (
    <Wrap>
      <div>
        <Input value="윈도우에 포커스가 맞춰진 상태에서만 기능이 동작하는지를 테스트하기위한 포커스 다른데 맞추기용 입력박스"/>
      </div>
      
      <div>
        <Input ref={inputRef} value={value} onChangeText={setValue}/>
      </div>
      
      <p>
        슬래시를 누르면, 입력박스로 포커스가 이동합니다. (구글 검색페이지 따라하기)
      </p>
      
      <video ref={videoRef} src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls/>
      
      <div>
        <p>유튜브 단축키 따라하기</p>
        <p>m을 누르시면 음소거 / 소리활성화가 반전됩니다.</p>
        <p>f를 누르시면 전체화면 / 초기화면이 반전됩니다.</p>
      </div>
      
    </Wrap>
  );
}

const SLASH_KEYBOARD_EVENT: MatchKeyboardEvent = {
  key: '/',
  specialKeys: EMPTY_ARRAY
};

const MUTE_TOGGLE_KEYBOARD_EVENT: MatchKeyboardEvent = {
  key: 'm',
  specialKeys: EMPTY_ARRAY
};

const FULLSCREEN_TOGGLE_KEYBOARD_EVENT: MatchKeyboardEvent = {
  key: 'f',
  specialKeys: EMPTY_ARRAY
};

const Wrap = styled.div`
  padding: 5px;
  
  video {
    margin-top: 15px;
  }
  
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const Input = styled(InputText)`
  width: 800px;
  padding: 10px;
  border: 1px solid black;
  outline: none;
  margin-bottom: 5px;
  
  :focus {
    border-width: 3px;
    border-color: ${props => props.theme.main};
  }
`;
