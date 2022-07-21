import React, {useCallback, useEffect, useState} from 'react';
import type {GetServerSideProps} from 'next';
import type {Video} from '@type/response/video';
import type {ParsedUrlQuery} from 'querystring';
import VideoApi from '@api/VideoApi';
import styled from 'styled-components';
import Link from 'next/link';
import {InfiniteScrollRow} from '@pages/examples/api/infinite-scroll';
import type {PagingListResponse} from '@api/PagingApi';
import PagingApi from '@api/PagingApi';
import {Button} from '@component/atom/button/button-presets';

interface PageProp {
  videos: Video[];
  video: Video;
}

interface Param extends ParsedUrlQuery {
  pk: string;
}

export default function Page({videos, video}: PageProp) {
  const [pagingData, setPagingData] = useState<PagingListResponse & {page: number}>({list: [], total: 0, page: 1});
  
  const fetchMoreData = useCallback(() => {
    setPagingData(prevState => ({
      ...prevState,
      page: prevState.page + 1
    }));
  }, []);
  
  useEffect(() => {
    const api = new PagingApi();
    
    (async () => {
      const {data} = await api.getList(pagingData.page);
      setPagingData(prevState => ({
        total: data.total,
        list: prevState.list.concat(data.list),
        page: pagingData.page
      }));
    })().then();
  }, [pagingData.page]);
  
  useEffect(() => {
    setPagingData(({total: 0, page: 1, list: []}));
  }, [video.pk]);
  
  const {list, total} = pagingData;
  const haveMoreData = list.length < total;
  
  return (
    <Wrap>
      <LeftWrap>
        <StyledVideo src={video.url} controls/>
        {list.map(({key, order, color}) => (
          <InfiniteScrollRow key={key} style={{backgroundColor: color}}>{order}</InfiniteScrollRow>
        ))}
        {haveMoreData && <Button onClick={fetchMoreData}>더보기</Button>}
        
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
  const [res1, res2] = await Promise.all([api.getVideo(Number(pk)), api.getAllVideos()]);
  
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
