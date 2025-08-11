'use client';

import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {getBoardListApi} from '@/utils/service/common/api/board-client';
import {H1} from '@/components/element/typography';
import {CenterRowBox} from '@/components/test/index';
import Link from 'next/link';

export default function AnotherPageRefreshClientList() {
  const {data} = useQuery({
    queryKey: ['boardList'],
    queryFn: () => getBoardListApi(),

    /**
     * 원래 Server Side에서 데이터 패칭 시키고 이렇게 staleTime을 지정하면,
     * Client Side에서 또 데이터 패칭이 이루어지지만,
     *
     * 상위에서 streaming으로 데이터를 가져오도록 하면
     * 반드시 Client Side에서 데이터가 첫 렌더링시점에 없기 때문에,
     * Client Side에서 패치되지않음.
     *
     * 하지만 다른 페이지 갔다가 돌아온 케이스에서는 반드시 데이터가 있기 때문에,
     * 이 경우 다시 패칭이 됨.
     *
     * 하지만 API가 체감상 0.3초 미만으로 응답되면, 첫 렌더링 시점에 이미 데이터가 있기 때문에
     * Client Side에서 또 패치가됨.
     * 그러므로, 이런 Usage에서는 staleTime은 1초정도로 아주작게 0은 아닌값으로 정하는게 좋아보임.
     */
    staleTime: 50,
  });

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <H1>{data.currentTime} 에 최신화된 글</H1>
      {data.list.map(({pk, title}) => (
        <CenterRowBox key={pk}>
          <Link href="/staging/list/refresh/another-page/to">{title}</Link>
        </CenterRowBox>
      ))}
    </div>
  );
}
