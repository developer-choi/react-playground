import type {GetServerSideProps} from 'next';
import type {Board} from '@type/response-sub/board-sub';
import {haveAxiosResponse} from '@api/config';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import OgMeta from '@component/atom/OgMeta';
import Head from 'next/head';
import TextArea from '@component/extend/TextArea';
import Form from '@component/extend/Form';
import {useCallback} from 'react';
import styled from 'styled-components';
import ValidateError from '@util/services/handle-error/ValidateError';
import {validateNumber} from '@util/extend/browser/query-string';
import {getBoardOneApi} from '@api/board-api';
import {useAuth} from "@util/services/auth/auth-user-cache";
import {useAlertForNotLoggedIn} from '@util/services/auth/auth-util';

// URL: http://localhost:3000/experimental/handle-error/board/1
interface PageProp {
  board: Board;
}

export default function Page({board}: PageProp) {
  return <BoardOne board={board}/>
}

export const getServerSideProps: GetServerSideProps<PageProp> = async context => {
  try {
    const id = validateNumber(context.params?.id);
    const {board} = await getBoardOneApi(context, id);
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
          destination: '/solution/handle-error/board/list/1'
        }
      });

    } else {
      return handleServerSideError(error);
    }
  }
}

function BoardOne({board}: PageProp) {
  const {title, content, authorUserPk} = board;
  const isMine = useAuth().userInfo?.userPk === authorUserPk;

  return (
    <>
      <OgMeta title={title} description={content.slice(0, 30)}/>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <header>{title}</header>
        <article>{content}</article>
        {isMine && <button>삭제</button>}
        <ReplyForm/>
      </div>
    </>
  );
}

function ReplyForm() {
  const {loginStatus} = useAuth()
  const mustLogin = useAlertForNotLoggedIn();

  const addReply = useCallback(() => {
    // logic
  }, []);

  return (
    <StyledForm>
      <TextArea onClick={loginStatus === 'checking' ? undefined : loginStatus ? addReply : mustLogin}/>
      <button onClick={loginStatus === 'checking' ? undefined : loginStatus ? addReply : mustLogin}>댓글등록</button>
    </StyledForm>
  );
}

const StyledForm = styled(Form)`
  display: flex;
  
  textarea, button {
    border: 1px solid black;
  }
  
  button {
    padding: 5px 20px;
  }
`;
