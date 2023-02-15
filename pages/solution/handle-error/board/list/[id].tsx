import type {GetServerSideProps} from 'next';
import BoardApi from '@api/BoardApi';
import {validateNumberInQueryThrowError} from '@util/extend/browser/query-string';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import type {PagingResponse} from '@type/response/common';
import type {Board} from '@type/response-sub/board-sub';
import Link from 'next/link';
import styled from 'styled-components';
import {logoutInClientSide, useLoginStatus} from '@util/services/auth/auth';
import {useCallback} from 'react';
import ValidateError from '@util/services/handle-error/ValidateError';

interface PageProp extends PagingResponse{
  list: Board[];
}

export default function Page(props: PageProp) {
  return <BoardList {...props}/>
}

export const getServerSideProps: GetServerSideProps<PageProp> = async context => {
  const api = new BoardApi();
  try {
    const pageParam = validateNumberInQueryThrowError(context.params?.id);
    const {data: {page, list, total}} = await api.getList(context, pageParam);
    return {
      props: {
        page, list, total
      }
    };

  } catch (error) {
    if (error instanceof ValidateError) {
      return handleServerSideError(error, {
        notifyRedirect: {
          destination: '/solution/handle-error/board/list/1'
        }
      });

    } else {
      return handleServerSideError(error);
    }
  }
};

function BoardList({list}: PageProp) {
  const loginStatus = useLoginStatus();
  const logout = useCallback(() => {
    logoutInClientSide().then();
  }, []);

  return (
    <Wrap>
      {loginStatus === true && <button onClick={logout} style={{alignSelf: 'self-start'}}>로그아웃</button>}
      {list.map(({pk, title}) => (
        <Link key={pk} href={`/solution/handle-error/board/${pk}`} passHref>
          <StyledAnchor>{title}</StyledAnchor>
        </Link>
      ))}
      {loginStatus === true && (
        <Link href="/solution/handle-error/board/create">
          <a style={{alignSelf: 'self-start'}}>글쓰기</a>
        </Link>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledAnchor = styled.a`
  font-size: 16px;
  
  :hover {
    text-decoration: underline;
  }
`;
