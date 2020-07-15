import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';

export default function AppMain({children}: PropsWithChildren<{}>) {

  return (
      <AppMainStyle>
        {children}
      </AppMainStyle>
  );
}

const AppMainStyle = styled.div`
  padding: 40px 60px;
  width: 100%;
  height: 100%;
`;
