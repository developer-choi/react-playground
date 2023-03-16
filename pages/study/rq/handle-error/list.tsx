import React from 'react';
import {range} from '@util/extend/data-type/number';
import styled from 'styled-components';
import Link from 'next/link';

// URL: http://localhost:3000/study/rq/handle-error/list
export default function Page() {
  return (
    <Wrap>
      {array.map(value => (
        <Link key={value} href={`/study/rq/handle-error/${value}`}>
          {value}
        </Link>
      ))}
    </Wrap>
  );
}

const array = range(1, 10);

const Wrap = styled.div`
  padding: 10px;
  
  a {
    padding: 5px;
    font-size: 20px;
    text-decoration: underline;
  }
`;