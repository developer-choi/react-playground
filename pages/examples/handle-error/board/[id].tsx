import type {GetServerSideProps} from 'next';
import type {Board} from '@type/response-sub/board-sub';
import {ValidateError, validateNumberInQueryThrowError} from '@util/extend/query-string';
import BoardApi from '@api/BoardApi';
import {haveAxiosResponse} from '@api/BaseApi';
import {handleServerSideError} from '@util/handle-error/server-side-error';
import OgMeta from '@component/atom/OgMeta';
import Head from 'next/head';

interface PageProp {
  board: Board;
}

export default function Page({board}: PageProp) {
  const {title, content} = board;

  return (
    <>
      <OgMeta title={title} description={content.slice(0, 30)}/>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <header>{title}</header>
        <article>{content}</article>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async context => {
  const api = new BoardApi();
  try {
    const id = validateNumberInQueryThrowError(context.params?.id);
    const {data: {board}} = await api.getBoardOne(context, id);
    return {
      props: {
        board
      }
    };

  } catch (error) {
    const axiosError = haveAxiosResponse(error);

    if (axiosError?.response.status === 404 || error instanceof ValidateError) {
      return handleServerSideError(error, {
        notifyRedirect: {
          message: 'The article has been deleted or does not exist.',
          destination: '/examples/handle-error/board/list/1'
        }
      });

    } else {
      return handleServerSideError(error);
    }
  }
}
