import {useRouter} from 'next/router';
import {useEffect} from 'react';

interface ScrollPosition {
  top: number;
  left: number;
}

function getCacheManager() {
  const positionHistoryCache: Record<string, ScrollPosition> = {

  };

  let beforePopStateAsPath: string | undefined;

  return {
    //뒤로가기 또는 앞으로가기 했을 때 실행될 콜백함수
    onBeforePopState: (asPath: string) => {
      beforePopStateAsPath = asPath;
    },

    //현재 입장한 페이지가 뒤로가기 / 앞으로가기 해서 온 페이지인지 아니면 링크눌러서 온 페이지인지
    isMatchBackOrForward: (currentAsPath: string) => {
      return currentAsPath === beforePopStateAsPath;
    },

    onRouteChangeComplete: () => {
      beforePopStateAsPath = undefined;
    },

    setCacheInCurrentAsPath: (currentAsPath: string, position: ScrollPosition) => {
      positionHistoryCache[currentAsPath] = position;
    },

    popCacheInCurrentAsPath: (currentAsPath: string) => {
      const cache = positionHistoryCache[currentAsPath];
      delete positionHistoryCache[currentAsPath];
      return cache;
    }
  };
}

const cacheManager = getCacheManager();

export function useScrollRestoration() {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({as}) => {
      cacheManager.onBeforePopState(as);
      return true;
    });
  }, [router]);

  useEffect(() => {
    const thisAsPath = router.asPath;
    /**
     * 이거 안쓰면 외부링크 갔다가 왔을 때 스크롤 안돌아옴.
     * 돌아왔을 때 다시 처음부터 마운트 될꺼니까. auto로 다시 바꿔줘야지 ㅇㅇ 맞음.
     */
    window.history.scrollRestoration = 'auto';

    const routeChangeStartHandler = () => {
      /**
       * 이거 안하면, 목적지에서 뒤로가기 눌렀을 때 스크롤이 유지되지않고 위로 올라가버리는 현상이 발생함.
       * (= next.js 기본동작을 무시하기위해)
       */
      window.history.scrollRestoration = 'manual';

      /**
       * 뒤로가기해서 나가든, 그냥 눌러서 나가든, 무조건 set하긴해야함.
       * 그래야 추후에 다시 돌아올 때, 앞으로가기해서 돌아오든 할 때 스크롤보낼 수 있으니까.
       */
      cacheManager.setCacheInCurrentAsPath(thisAsPath, {
        top: window.scrollY,
        left: window.scrollX
      });
    };

    const routeChangeCompleteHandler = () => {
      const cache = cacheManager.popCacheInCurrentAsPath(thisAsPath);

      if (cache && cacheManager.isMatchBackOrForward(thisAsPath)) {
        const {top, left} = cache;
        setTimeout(() => window.scrollTo({top, left}), 0);
      }

      cacheManager.onRouteChangeComplete();

      /**
       * 이거 안쓰면 2회차부터 뒤로갈 때 목적지에서 스크롤 움직여버리는데 명확하게 원인설명안됨.
       * 출발지 ==> 목적지 ==> (뒤로가기) ==> 출발지 ==> (앞으로가기) ==> 목적지 ==> (뒤로가기) 딱 이 스탭에서 스크롤이 유지안되고 움직여버림.
       */
      window.history.scrollRestoration = 'manual';
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeCompleteHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeComplete', routeChangeCompleteHandler);
    };
  }, [router]);
}
