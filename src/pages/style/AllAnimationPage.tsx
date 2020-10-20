import React from 'react';
import styled from 'styled-components';
import {useSetDocumentTitle} from '../../utils/custom-hooks/useSetDocumentTitle';
import {H1} from '../../components/layout/heading';

export default function AllAnimationPage() {

  useSetDocumentTitle('애니메이션 예제모음');

  return (
      <Wrap>
        <H1>애니메이션 예제모음</H1>
      </Wrap>
  );
}

const Wrap = styled.div`
`;
