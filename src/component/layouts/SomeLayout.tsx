import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import SomeSidebar, {SIDEBAR_WIDTH} from '@component/layouts/some/SomeSidebar';
import SomeHeader, {HEADER_HEIGHT} from '@component/layouts/some/SomeHeader';
import {useLogMount} from '@util/extend/react';

export default function SomeLayout({children}: PropsWithChildren<any>) {
  useLogMount('some-layout');

  return (
    <Wrap>
      <SomeHeader/>
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
  margin-top: ${HEADER_HEIGHT}px;
  margin-left: ${SIDEBAR_WIDTH}px;
  flex-grow: 1;
  padding: 20px;
`;
