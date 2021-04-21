import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

export default function UseRouterResult() {
  
  const {asPath, pathname, route} = useRouter();
  
  return (
      <Wrap>
        <ParamText>asPath = {asPath}</ParamText>
        <ParamText>pathname = {pathname}</ParamText>
        <ParamText>route = {route}</ParamText>
      </Wrap>
  );
}

const Wrap = styled.div`
`;

const ParamText = styled.span`
  font-size: 17px;
  font-weight: bold;
  line-height: 1.5;
  display: block;
`;
