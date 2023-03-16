import React from 'react';
import {range} from '@util/extend/data-type/number';
import styled from 'styled-components';
import Link from 'next/link';
import {isErrorInRetryExample} from '@pages/study/rq/handle-error/retry-zero/[pk]';

// URL: http://localhost:3000/study/rq/handle-error/list
export default function Page() {
  return (
    <Wrap>
      <Item>
        retry-zero:
        {array.map(pk => (
          <Link key={pk} href={`/study/rq/handle-error/retry-zero/${pk}`}>
            {isErrorInRetryExample(pk) ? `error-${pk}` : `success-${pk}`}
          </Link>
        ))}
      </Item>

      <Item>
        failureCount:
        {array.map(pk => (
          <Link key={pk} href={`/study/rq/handle-error/failure-count/${pk}`}>
            {isErrorInRetryExample(pk) ? `error-${pk}` : `success-${pk}`}
          </Link>
        ))}
      </Item>
    </Wrap>
  );
}

const array = range(1, 10);

const Wrap = styled.div`
  padding: 10px;
  
  a {
    padding: 5px;
    font-size: 16px;
    text-decoration: underline;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;
