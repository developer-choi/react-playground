import React, {useCallback, useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import type {Video} from '@type/response/video';
import type {ParsedUrlQuery} from 'querystring';
import VideoApi from '@api/VideoApi';
import styled from 'styled-components';
import Link from 'next/link';
import {InfiniteScrollRow} from '@pages/feature/infinite-scroll';
import Button from '@component/atom/element/Button';
import {GetMoreDataApiHandler, useGetMoreDataClientSide} from '@util/custom-hooks/get-more-data';
import CourseApi from '@api/CourseApi';
import type {Course} from '@type/response-sub/course-sub';

interface PageProp {
  videoList: Video[];
  video: Video;
}

interface Param extends ParsedUrlQuery {
  pk: string;
}

/**
 * URL: http://localhost:3000/feature/get-more-data/part-of-page/1
 */
export default function Page({videoList, video}: PageProp) {
  const getApiHandler = useCallback<GetMoreDataApiHandler<Course>>(async (page) => {
    const api = new CourseApi();
    //원래는 이게 댓글목록 API여서 여기서 본문글PK도 같이 보내야함
    const {data: {list, total}} = await api.getList(page);
    return {
      list,
      total
    };
  }, []);

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
        {list.map(({pk, title}) => (
          <InfiniteScrollRow key={pk}>{title}</InfiniteScrollRow>
        ))}
        {haveMoreData && <Button onClick={setMoreData}>더보기</Button>}

      </LeftWrap>
      <RightWrap>
        {videoList.map(({pk, thumbnail}) => (
          <Link key={pk} href={`/feature/get-more-data/part-of-page/${pk}`}>
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
  const [res1, res2] = await Promise.all([api.getOne(Number(pk)), api.getList()]);

  return {
    props: {
      videoList: res2.data.list,
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
