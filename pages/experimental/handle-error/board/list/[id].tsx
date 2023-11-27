import type {GetServerSideProps} from 'next';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import type {PagingResponse} from '@type/response/common';
import type {Board} from '@type/response-sub/board-sub';
import Link from 'next/link';
import styled from 'styled-components';
import ValidateError from '@util/services/handle-error/ValidateError';
import {validateNumber} from '@util/extend/browser/query-string';
import {getBoardListApi} from '@api/board-api';
import {useAuth, useLogout} from '@util/services/auth/auth-user';

// URL: http://localhost:3000/experimental/handle-error/board/list/1
interface PageProp extends PagingResponse{
  list: Board[];
}

export default function Page(props: PageProp) {
  return <BoardList {...props}/>
}

export const getServerSideProps: GetServerSideProps<PageProp> = async context => {
  try {
    const pageParam = validateNumber(context.params?.id);
    const {page, list, total} = await getBoardListApi(context, pageParam);
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
  const {loginStatus} = useAuth()
  const logout = useLogout()

  return (
    <Wrap>
      {loginStatus === true && <button onClick={() => logout()} style={{alignSelf: 'self-start'}}>로그아웃</button>}
      {list.map(({pk, title}) => (
        <Link key={pk} href={`/solution/handle-error/board/${pk}`} passHref>
          <StyledAnchor>{title}</StyledAnchor>
        </Link>
      ))}
      {loginStatus === true && (
        <Link href="/experimental/handle-error/board/create">
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
