import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';

export default function Section({children}: PropsWithChildren<{}>) {

  return (
      <SectionStyle>
        {children}
      </SectionStyle>
  );
}

const SectionStyle = styled.section`
  flex-grow: 1;
`;
