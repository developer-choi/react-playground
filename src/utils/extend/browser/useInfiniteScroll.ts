import {useEffect, useRef} from 'react';
import {UseInfiniteQueryResult} from '@tanstack/react-query';

// https://docs.google.com/document/d/1IeMIvPc-18TKEscvuRYmktziMxieeKW_wJGB779nOXg/edit
export interface InfiniteScrollParam {
  listSelector: string;
  offset?: number; // default 300
  queryResult: Pick<UseInfiniteQueryResult, 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage'>;
}


/** QnA 2회차 불러올 때부터, 스크롤이 바닥 근처에 있을 때 API를 더 볼러오는게 아니라, 상단에 있을 때 더 불러와요
 *  >>
 *  hasNextPage / isFetchingNextPage 값이 데이터를 패칭할 때마다 값이 바뀌는지 체크.
 *  만약 안바뀐다면, listEndDom이 계속 리스트의 중간쯤에 걸쳐져있어서
 *  바닥이 아닌 중간쯤에 스크롤이 지나갈 때 API가 호출됨.
 */
export function useInfiniteScroll({listSelector, queryResult, offset = 300}: InfiniteScrollParam) {
  const observerRef = useRef<IntersectionObserver>();
  const {fetchNextPage, hasNextPage, isFetchingNextPage} = queryResult;
  const enabled = hasNextPage && !isFetchingNextPage;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listDom = document.querySelector(listSelector);

    if (!listDom) {
      console.warn(`listSelector에 해당하는 HTML element를 찾을 수 없음. selector로 전달된 ${listSelector}가 정확한지, 해당 HTML element가 렌더링되는 시점과 어긋나지는 않았는지 확인필요`);
      return;
    }

    const listEndDom = document.createElement("div");
    listEndDom.style.setProperty('width', '0px', 'important');
    listEndDom.style.setProperty('height', '0px', 'important');
    listEndDom.className = "hidden"; // 혹시나 리스트 밑에 나오는 이 div때문에 스타일이 어긋나는 경우, 이 className을 통해 마크업
    listDom.appendChild(listEndDom);

    observerRef.current = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    }, {
      rootMargin: `0px 0px ${offset}px 0px`
    });

    observerRef.current.observe(listEndDom);

    return () => {
      observerRef.current?.disconnect();
      listDom.removeChild(listEndDom);
    };
  }, [fetchNextPage, enabled, listSelector, offset]);
}
