import React from 'react';
import OptionalLink from '@component/atom/OptionalLink';
import styled from 'styled-components';

// URL: http://localhost:3000/solution/components/html/is-our-link
export default function Page() {
  return (
    <>
      <StyledLink href="https://www.naver.com/">
        https://www.naver.com
      </StyledLink>
      <StyledLink href="http://localhost:3000">
        http://localhost:3000
      </StyledLink>
      <StyledLink href="http://localhost:3000/solution/components/html/is-our-link">
        http://localhost:3000/solution/components/html/is-our-link
      </StyledLink>
      <StyledLink href="/solution/components/html/is-our-link">
        /solution/components/html/is-our-link
      </StyledLink>
      <StyledLink href={undefined}>
        undefined href
      </StyledLink>
    </>
  );
}

const StyledLink = styled(OptionalLink)`
  display: block;
  padding: 5px;
`;
