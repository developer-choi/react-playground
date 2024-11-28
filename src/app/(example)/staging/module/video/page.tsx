import {BigSectionAtIntroduce} from '@/components/test';
import {LazyVideo} from '@/components/element/Video';
import {RESOURCE} from '@/utils/extend/test/resources';
import React from 'react';

// URL: http://localhost:3000/staging/module/video/lazy
// Doc: https://docs.google.com/document/d/1IbhSptXmOB88OS5YPOJZ8yTAupCNFlcjyVqlAv1jInA/edit?tab=t.0#heading=h.tisczqt5zqzd
export default function Home() {
  return (
    <main>
      {/* 1. aspectRatio와 width를 지정하는 방식으로 부모컨테이너 비율 기준으로 로딩중 비디오 크기 지정 가능 */}
      <BigSectionAtIntroduce>
        <LazyVideo id="video-1" src={RESOURCE.heavy.videos[0]} aspectRatio="960/540" width="50%" />
      </BigSectionAtIntroduce>

      {/* 2. width, height를 직접 지정하는 방식으로 로딩중 비디오 크기 지정됨 + 부모 컨테이너가 그거보다 크다면, 이거 이상 늘어나지않도록 설정됨. */}
      <BigSectionAtIntroduce>
        <LazyVideo id="video-2" src={RESOURCE.heavy.videos[1]} aspectRatio="960/540" width={960}/>
      </BigSectionAtIntroduce>

      {/* 예외 1. aspectRatio 방식인데 width 지정 안했으면 기본 100%로 지정됨. */}
      <BigSectionAtIntroduce>
        <LazyVideo id="video-3" src={RESOURCE.heavy.videos[2]} aspectRatio="960/540" />
      </BigSectionAtIntroduce>

      {/* 예외 2. 부모 컨테이너보다 큰 값으로 잡아도 최대 부모컨테이너만큼만 제한됨. */}
      <BigSectionAtIntroduce>
        <LazyVideo id="video-4" src={RESOURCE.heavy.videos[3]} aspectRatio="960/540" width={2880} />
      </BigSectionAtIntroduce>
    </main>
  );
}
