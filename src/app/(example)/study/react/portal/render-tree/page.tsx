'use client';

import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {useDelay} from '@/utils/extend/library/react';

/**
 * URL: http://localhost:3000/study/react/portal/render-tree
 * Doc: https://docs.google.com/document/d/17EQAoACBMZeRHAkDp8An7CmoR4H3vuBM9u67r_N1W0A/edit#heading=h.uuhcbnblgwrr
 * (Production상태에서 개발자도구 콘솔로그 확인)
 * React Tree 자체는 기존과 동일한것으로 생각됨. (공식문서 이해가안됨)
 * 기존처럼 1단 부모-자식으로 엮어놨는데,
 * 기존과 동일하게 자식먼저 마운트되고 이후에 부모 마운트된다거나 하는 특징이 그대로 재현됨.
 */
export default function Page() {
  const visible = useDelay(500);

  if (!visible) {
    return null;
  } else {
    return <Parent/>
  }
}

function Parent() {
  useEffect(() => {
    console.log('Parent is mounted.');
  }, []);

  return (
    <PortalChildren/>
  );
}

function PortalChildren() {
  useEffect(() => {
    console.log('Children is mounted');
  }, []);

  return createPortal(<div>Portal</div>, document.body);
}
