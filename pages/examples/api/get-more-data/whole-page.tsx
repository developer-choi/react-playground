import React, {useCallback} from 'react';
import type {GetServerSideProps} from 'next';
import {InfiniteScrollRow} from '@pages/examples/api/infinite-scroll';
import Button from '@component/atom/button/Button';
import type {GetMoreDataApiHandler} from '@util/custom-hooks/get-more-data';
import {useGetMoreDataServerSide} from '@util/custom-hooks/get-more-data';
import CourseApi from '@api/CourseApi';
import type {CourseListResponse} from '@type/response/course';
import type {Course} from '@type/response-sub/course-sub';

/**
 * http://localhost:3000/examples/api/get-more-data/whole-page
 */
export default function Page(props: CourseListResponse) {
  const getApiHandler = useCallback<GetMoreDataApiHandler<Course>>(async (page) => {
    const api = new CourseApi();
    const {data: {total, list}} = await api.getList(page);
    return {
      list,
      total
    };
  }, []);
  
  const {list, setMoreData, haveMoreData} = useGetMoreDataServerSide({
    initialData: {
      list: props.list,
      total: props.total
    },
    getApiHandler
  });
  
  return (
    <>
      {list.map(({pk, title}) =>
        <InfiniteScrollRow key={pk}>{title}</InfiniteScrollRow>
      )}
      {haveMoreData && <Button onClick={setMoreData}>더보기</Button>}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CourseListResponse> = async () => {
  const api = new CourseApi();
  const {data: {total, list}} = await api.getList(1);
  
  return {
    props: {
      list,
      total
    }
  };
};
