'use client';

import React, {useCallback, useRef, useState} from 'react';
import styles from './page.module.scss';
import {KeyboardShortcut, useKeyboardShortcut} from '@/utils/extend/event/keyboard';
import {isVideoInFullscreen} from '@/utils/extend/browser/document';

// URL: http://localhost:3000/staging/module/keyboard-shortcut/window-keydown
// Doc: https://docs.google.com/document/d/1uZLOByowdB8hPDVzDHaSkaBij8T08LOkkobxGi8jAHs/edit
export default function WindowKeyDownPage() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut(SLASH_KEYBOARD_EVENT, useCallback(event => {
    inputRef.current?.focus();
    event.preventDefault();
  }, []));

  const videoRef = useRef<HTMLVideoElement>(null);

  useKeyboardShortcut(MUTE_TOGGLE_KEYBOARD_EVENT, useCallback(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.muted = !videoElement.muted;
    }
  }, []));

  useKeyboardShortcut(FULLSCREEN_TOGGLE_KEYBOARD_EVENT, useCallback(() => {
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
    <div className={styles.wrap}>
      <input ref={inputRef} value={value} onChange={event => setValue(event.target.value)} placeholder="슬래시를 누르면 포커스가 이동됩니다"/>

      <p>
        슬래시를 누르면, 입력박스로 포커스가 이동합니다. (구글 검색페이지 따라하기)
      </p>

      <video ref={videoRef} src={VIDEO_URL} controls/>

      <div>
        <p>유튜브 단축키 따라하기</p>
        <p>m을 누르시면 음소거 / 소리활성화가 반전됩니다.</p>
        <p>f를 누르시면 전체화면 / 초기화면이 반전됩니다.</p>
      </div>
    </div>
  );
}

const VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const SLASH_KEYBOARD_EVENT: KeyboardShortcut = {
  key: '/',
  specialKeys: []
};

const MUTE_TOGGLE_KEYBOARD_EVENT: KeyboardShortcut = {
  key: 'm',
  specialKeys: []
};

const FULLSCREEN_TOGGLE_KEYBOARD_EVENT: KeyboardShortcut = {
  key: 'f',
  specialKeys: []
};
