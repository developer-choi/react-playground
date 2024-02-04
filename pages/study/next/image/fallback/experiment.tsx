import React from 'react';
import AdvancedImage from '@component/atom/element/AdvancedImage';
import styled from 'styled-components';

// URL: http://localhost:3000/study/next/image/fallback/experiment
export default function Page() {
  return (
    <Wrapper>
      <AdvancedImage alt="ALT TEXT" src="/images/some.png" width={200} height={100} layout="fixed"/>
      <AdvancedImage fallback={{behavior: 'replace-image'}} alt="ALT TEXT" src="/images/some.png" width={200} height={100} layout="fixed"/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  > * {
    border: 5px solid red !important;
  }
`;
