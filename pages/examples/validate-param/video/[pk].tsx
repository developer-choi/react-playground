import React from 'react';
import type {GetServerSideProps} from 'next';
import type {Video} from '@type/response/video';
import {validateNumberInQueryString} from '@util/extend/query-string';
import VideoApi from '@api/VideoApi';

interface PageProp {
  video: Video;
}

export default function Page({video}: PageProp) {
  
  return (
    <video src={video.url} controls/>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp, Param> = async ({params}) => {
  const pk = validateNumberInQueryString(params?.pk);
  
  if (pk === undefined) {
    return {
      notFound: true
    };
  }
  
  try {
    const api = new VideoApi();
    const response = await api.getVideoOne(pk);
  
    return {
      props: {
        video: response.data.video
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

type Param = {
  pk: string;
}
