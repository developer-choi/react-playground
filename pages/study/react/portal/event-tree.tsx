import React, {useCallback} from 'react';
import {createPortal} from 'react-dom';
import {useDelay} from '@util/extend/time';

/**
 * URL: http://localhost:3000/study/react/portal/event-tree
 *
 * (Production상태에서 개발자도구 콘솔로그 확인)
 * Click ME 버튼 클릭하면 무려 버블링이 됨.
 * 돔구조로 상으로는 절대 불가능해보였는데,
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
  const onClock = useCallback(() => {
    console.log('Bubbled in parent');
  }, []);

  return (
    <div onClick={onClock}>
      <PortalChildren/>
    </div>
  );
}

function PortalChildren() {
  try {
    const element = document.getElementById('__next');

    if (!element) {
      return null;
    } else {
      return createPortal(<button>Click Me</button>, element);
    }
  } catch (error: any) {
    return null;
  }
}
