import React from 'react';
import Video from '@/components/element/Video';
import {RESOURCE} from '@/utils/extend/test/resources';

/**
 * 1. 네트워크 속도 느리게 해놓고,
 * 2. Disable cache 해서
 * 새로고침 할 때마다 어떻게 되는지 테스트하면됨.
 *
 * URL: http://localhost:3000/staging/module/video
 * Doc: https://docs.google.com/document/d/1IbhSptXmOB88OS5YPOJZ8yTAupCNFlcjyVqlAv1jInA/edit?tab=t.0#heading=h.tisczqt5zqzd
 */
export default function Page() {
  return (
    // <LayoutShiftExample/>
    // <GoodExample1/>
    <GoodExample2/>
  );
}

// 비디오 블러오고나서 Layout Shift가 발생함.
function LayoutShiftExample() {
  return (
    <div>
      <video src="https://github.com/developer-choi/resources/blob/master/heavy/videos/1.mp4?raw=true" autoPlay muted loop controls />
      <NextElement/>
    </div>
  );
}

/**
 * Case 1, 비디오 크기 (1920)보다 큰 컨테이너 케이스 (video 태그 기본동작 그대로 1920보다 더 안커짐)
 */
function GoodExample1() {
  return (
    <div>
      <Video src="https://github.com/developer-choi/resources/blob/master/heavy/videos/1.mp4?raw=true" width={1920} height={1080} autoPlay loop controls />
      <NextElement/>
    </div>
  );
}

/**
 * Case 2, 비디오 크기 (1920)보다 작은 컨테이너 케이스 (비디오가 부모컨테이너를 뚷고나가지않음)
 */
function GoodExample2() {
  return (
    <div style={{width: 1000}}>
      <Video src={RESOURCE.heavy.videos[0]} width={1920} height={1080} autoPlay loop controls />
      <NextElement/>
    </div>
  );
}

function NextElement() {
  return (
    <div style={{width: 300, height: 50, backgroundColor: 'red'}} />
  );
}
