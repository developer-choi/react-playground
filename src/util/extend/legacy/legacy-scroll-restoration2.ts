import {useRouter} from 'next/router';
import {useEffect} from 'react';

function saveScrollPos(url: string) {
  const scrollPos = { x: window.scrollX, y: window.scrollY };
  sessionStorage.setItem(url, JSON.stringify(scrollPos));
}

function restoreScrollPos(url: string) {
  const item = sessionStorage.getItem(url);

  if (!item) {
    return;
  }

  const scrollPos = JSON.parse(item);

  if (scrollPos) {
    setTimeout(() => window.scrollTo({top: scrollPos.y, left: scrollPos.x, behavior: 'smooth'}), 0);
  }
}

// https://velog.io/@hyesungoh/%EA%B9%94%EB%81%94%ED%95%98%EC%A7%80%EB%A7%8C-%ED%99%94%EB%A0%A4%ED%95%98%EA%B3%A0-%EB%8B%A8%EC%A1%B0%EB%A1%AD%EC%A7%80%EB%A7%8C-%EC%BB%AC%EB%9F%AC%ED%92%80%ED%95%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%EA%B8%B0-2
export function useScrollRestorationSolution2() {
  const router = useRouter();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      let shouldScrollRestore = false;
      window.history.scrollRestoration = 'manual';
      restoreScrollPos(router.asPath);

      const onBeforeUnload = (event: any) => {
        saveScrollPos(router.asPath);
        // eslint-disable-next-line no-param-reassign
        delete event['returnValue'];
      };

      const onRouteChangeStart = () => {
        saveScrollPos(router.asPath);
      };

      const onRouteChangeComplete = (url: string) => {
        if (shouldScrollRestore) {
          shouldScrollRestore = false;
          restoreScrollPos(url);
        }
      };

      window.addEventListener('beforeunload', onBeforeUnload);
      router.events.on('routeChangeStart', onRouteChangeStart);
      router.events.on('routeChangeComplete', onRouteChangeComplete);
      router.beforePopState(() => {
        shouldScrollRestore = true;
        return true;
      });

      return () => {
        window.removeEventListener('beforeunload', onBeforeUnload);
        router.events.off('routeChangeStart', onRouteChangeStart);
        router.events.off('routeChangeComplete', onRouteChangeComplete);
        router.beforePopState(() => true);
      };
    }
  }, [router]);
}
