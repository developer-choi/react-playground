import React, {DivProp, PropsWithChildren} from 'react';
import styled from 'styled-components';

export interface LoadingContainerProp extends PropsWithChildren<DivProp> {
  loading: boolean;
  noData?: boolean;
}

export default function LoadingContainer({children, loading, noData, ...rest}: LoadingContainerProp) {

  const viewChildren = !loading && !noData;

  return (
      <LoadingWrap {...rest}>
        {children}
        <Absolute className={viewChildren ? '' : 'visible'}>
          {noData ? '데이터없음' : loading ? '로딩중' : '데이터있음.'}
        </Absolute>
      </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: none;
  
  &.visible {
    display: block;
  }
`;
