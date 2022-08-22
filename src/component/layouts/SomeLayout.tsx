import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import SomeSidebar from '@component/layouts/some/SomeSidebar';

export default function SomeLayout({children}: PropsWithChildren<any>) {

  return (
    <Wrap>
      <SomeSidebar/>

      <Article>
        {children}
      </Article>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100%;
`;

const Article = styled.article`
  flex-grow: 1;
  padding: 20px;
`;
