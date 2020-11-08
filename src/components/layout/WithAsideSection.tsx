import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import {SectionStyle} from './Section';
import Aside from './Aside';
import {HEIGHTS, WIDTHS} from '../../utils/style/layout';

export default function WithAsideSection({children}: PropsWithChildren<{}>) {

  return (
      <Wrap>
        <Page>
          {children}
        </Page>
        <Aside/>
      </Wrap>
  );
}

const Wrap = styled(SectionStyle)`
  display: flex;
`;

const Page = styled.div`
  flex-grow: 1;
  padding-top: ${HEIGHTS.headerDiffSection}px;
  margin-right: ${WIDTHS.aside}px;
  
  //아직 react에서 어떻게 반응형잡는지 모르겠으니 일단 이렇게 해둠.
  padding-left: 40px;
  padding-right: 40px;
`;
