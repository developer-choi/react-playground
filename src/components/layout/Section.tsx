import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import {HEIGHTS} from '../../utils/style/layout';

export default function Section({children}: PropsWithChildren<{}>) {

  return (
      <SectionStyle>
        {children}
      </SectionStyle>
  );
}

export const SectionStyle = styled.section`
  margin-top: ${HEIGHTS.header}px;
`;
