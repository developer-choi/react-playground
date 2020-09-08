import React from 'react';
import styled from 'styled-components';

export default function Footer() {

  return (
      <FooterStyle>
        This is Footer Page
      </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  background: ${props => props.theme.colors.black};
  height: 60px;
  flex-shrink: 0;
`;
