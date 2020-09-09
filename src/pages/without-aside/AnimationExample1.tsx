import React from 'react';
import styled from 'styled-components';
import {LOREM_IPSUM} from '../../utils/dummy';
import Span from '../../components/basic/Span';

export default function AnimationExample1() {

  return (
      <Wrap>
        <Title numberOfLines={2}>{LOREM_IPSUM}</Title>
        <Content>{LOREM_IPSUM}</Content>
      </Wrap>
  );
}

const Wrap = styled.div`
  background-color: purple;
  min-height: 100%;
`;

const Title = styled(Span)`
  color: white;
  font-weight: bold;
`;

const Content = styled.span`
  color: white;
  margin-top: 20px;
`;
