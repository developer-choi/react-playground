import {useRouter} from 'next/router';
import {useEffect} from 'react';

const scrollRestorationCache: Record<string, {left: number, top: number}> = {

};

let beforePopStateAsPath: string | undefined;

export function useScrollRestoration() {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({as}) => {
      beforePopStateAsPath = as;
      return true;
    });
  }, [router]);

  useEffect(() => {
    const thisAsPath = router.asPath;
    window.history.scrollRestoration = 'auto'; //명확하게 이거 써야하는 이유를 설명못함.

    const routeChangeStartHandler = () => {
      window.history.scrollRestoration = 'manual';

      /**
       * 뒤로가기해서 나가든, 그냥 눌러서 나가든, 무조건 set하긴해야함.
       * 그래야 추후에 다시 돌아올 때, 앞으로가기해서 돌아오든 할 때 스크롤보낼 수 있으니까.
       */
      scrollRestorationCache[thisAsPath] = {
        top: window.scrollY,
        left: window.scrollX
      };
    };

    const routeChangeCompleteHandler = () => {
      if (scrollRestorationCache[thisAsPath] && beforePopStateAsPath === thisAsPath) {
        const {top, left} = scrollRestorationCache[thisAsPath];
        setTimeout(() => window.scrollTo({top, left, behavior: 'smooth'}), 0);
        delete scrollRestorationCache[thisAsPath]
      }

      beforePopStateAsPath = undefined;
      window.history.scrollRestoration = 'manual'; //이거 안쓰면 2회차부터 뒤로갈 때 목적지에서 스크롤 움직여버리는데 명확하게 원인설명안됨.
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeCompleteHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeComplete', routeChangeCompleteHandler);
    };
  }, [router]);
}
