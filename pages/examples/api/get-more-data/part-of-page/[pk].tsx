import React, {useCallback, useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import type {Video} from '@type/response/video';
import type {ParsedUrlQuery} from 'querystring';
import VideoApi from '@api/VideoApi';
import styled from 'styled-components';
import Link from 'next/link';
import {InfiniteScrollRow} from '@pages/examples/api/infinite-scroll';
import PagingApi from '@api/PagingApi';
import {Button} from '@component/atom/button/button-presets';
import {GetMoreDataApiHandler, useGetMoreDataClientSide} from '@util/custom-hooks/get-more-data';
import type {PagingListType} from '@pages/api/paging';

interface PageProp {
  videos: Video[];
  video: Video;
}

interface Param extends ParsedUrlQuery {
  pk: string;
}

export default function Page({videos, video}: PageProp) {
  const getApiHandler = useCallback<GetMoreDataApiHandler<PagingListType>>(async (page) => {
    const api = new PagingApi();
    const {data} = await api.getPaging(page, video.pk);
    return {
      list: data.list,
      total: data.total
    };
  }, [video.pk]);
  
  const {list, haveMoreData, setInitialData, setMoreData} = useGetMoreDataClientSide({
    getApiHandler
  });
  
  useEffect(() => {
    setInitialData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.pk]);
  
  return (
    <Wrap>
      <LeftWrap>
        <StyledVideo src={video.url} controls/>
        {list.map(({key, order, color}) => (
          <InfiniteScrollRow key={key} style={{backgroundColor: color}}>{order}</InfiniteScrollRow>
        ))}
        {haveMoreData && <Button onClick={setMoreData}>더보기</Button>}
        
      </LeftWrap>
      <RightWrap>
        {videos.map(({pk, thumbnail}) => (
          <Link key={pk} href={`/examples/api/get-more-data/part-of-page/${pk}`}>
            <a>
              <img src={thumbnail} alt="video thumbnail"/>
            </a>
          </Link>
        ))}
      </RightWrap>
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp, Param> = async ({params}) => {
  const {pk} = params as Param;
  const api = new VideoApi();
  const [res1, res2] = await Promise.all([api.getOne(Number(pk)), api.getAll()]);
  
  return {
    props: {
      videos: res2.data.videos,
      video: res1.data.video
    }
  };
};

const Wrap = styled.div`
  display: flex;
  min-height: 100%;
`;

const LeftWrap = styled.div`
  flex-grow: 1;
  margin-right: 15px;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  
  img {
    width: 100%;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
`;
