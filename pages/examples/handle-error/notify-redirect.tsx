import React from 'react';
import type {GetServerSidePropsContext} from 'next';
import {validateNumberInQueryString} from '@util/extend/query-string';
import BoardApi from '@api/BoardApi';
import {handleServerSideError} from '@util/api/server-side-error';

export default function Page() {
  return (
    <>
      이 페이지는 글 상세내용 보는 페이지고 /board/9999 이동하려고했는데 9999 게시글이 없는 상황
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const boardNo = validateNumberInQueryString(context.params?.boardNo);
    const api = new BoardApi();
    const {data} = await api.getBoardOne(boardNo);

    return {
      props: {
        board: data
      }
    };

  } catch (error) {
    return handleServerSideError(error, {
      notifyRedirect: {
        message: 'Posts that have been deleted or do not exist.',
        destination: '/board/list?page=1'
      }
    });
  }
}
