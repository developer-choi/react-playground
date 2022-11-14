import React from 'react';
import LinkOrAnchor from '@component/atom/LinkOrAnchor';
import styled from 'styled-components';

export default function Page() {
  return (
    <>
      <StyledLink href="https://www.naver.com/">
        https://www.naver.com
      </StyledLink>
      <StyledLink href="http://localhost:3000">
        http://localhost:3000
      </StyledLink>
    </>
  );
}

const StyledLink = styled(LinkOrAnchor)`
  display: block;
  padding: 5px;
`;
