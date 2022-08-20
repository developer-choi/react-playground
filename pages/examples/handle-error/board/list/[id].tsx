import type {GetServerSideProps} from 'next';
import BoardApi from '@api/BoardApi';
import {ValidateError, validateNumberInQueryThrowError} from '@util/extend/query-string';
import {handleServerSideError} from '@util/handle-error/server-side-error';
import type {PagingResponse} from '@type/response/common';
import type {Board} from '@type/response-sub/board-sub';
import Link from 'next/link';
import styled from 'styled-components';

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
          destination: '/examples/handle-error/board/list/1'
        }
      });

    } else {
      return handleServerSideError(error);
    }
  }
};

function BoardList({list}: PageProp) {
  return (
    <Wrap>
      {list.map(({pk, title}) => (
        <Link key={pk} href={`/examples/handle-error/board/${pk}`} passHref>
          <StyledAnchor>{title}</StyledAnchor>
        </Link>
      ))}
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
