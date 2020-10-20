import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';

export default function Section({children}: PropsWithChildren<{}>) {

  return (
      <Wrap>
        {children}
      </Wrap>
  );
}

const Wrap = styled.section`
`;
