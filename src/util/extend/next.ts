import {useRouter} from 'next/router';
import {useCallback, useEffect} from 'react';

export function isServerSide() {
  try {
    localStorage;
    return false;
  } catch (error) {
    return true;
  }
}

export function getMessageOfBothSide() {
  if (isServerSide()) {
    return 'on Server Side';
  }

  return 'on Client Side';
}

export function useRefreshGetServerSideProps() {
  const {replace, asPath} = useRouter();

  return useCallback(async () => {
    await replace(asPath);
  }, [replace, asPath]);
}

export function useScrollRestoration() {
  const router = useRouter();

  useEffect(() => {
    window.history.scrollRestoration = 'auto';

    const cacheScrollPositions: Array<[number, number]> = [];
    let shouldScrollRestore: null | {x: number; y: number};

    router.events.on('routeChangeStart', () => {
      cacheScrollPositions.push([window.scrollX, window.scrollY]);
    });

    router.events.on('routeChangeComplete', () => {
      if (shouldScrollRestore) {
        const {x, y} = shouldScrollRestore;
        setTimeout(() => window.scrollTo(x, y), 0);
        shouldScrollRestore = null;
      }
      window.history.scrollRestoration = 'auto';
    });

    router.beforePopState(() => {
      if (cacheScrollPositions.length > 0) {
        const scrollPosition = cacheScrollPositions.pop();
        if (scrollPosition) {
          shouldScrollRestore = {
            x: scrollPosition[0],
            y: scrollPosition[1]
          };
        }
      }
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);
}
