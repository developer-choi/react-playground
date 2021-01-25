import React, {DivProp, PropsWithChildren, useEffect, useState} from 'react';
import styled from 'styled-components';

export interface LoadingContainerProp extends PropsWithChildren<DivProp> {
  loading: boolean;
  noData?: boolean;
  fixHeight?: number | string;
}

export default function LoadingContainer({children, loading, noData, fixHeight, style, ...rest}: LoadingContainerProp) {

  const viewChildren = !loading && !noData;

  return (
      <LoadingWrap style={{...style, height: viewChildren ? undefined : fixHeight}} {...rest}>
        {children}
        <Absolute className={viewChildren ? '' : 'visible'}>
          {loading && '로딩중'}
          {noData && '데이터 없음'}
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
  align-items: center;
  justify-content: center;
  background-color: white;

  &.visible {
    display: flex;
  }
`;

export function LoadingExample() {

  const [data, setData] = useState<{nums: number[], receiveResponse: boolean}>({
    nums: [],
    receiveResponse: false
  });

  useEffect(() => {
    (async () => {
      setData({receiveResponse: true, nums: [1, 2, 3, 4]});
    })().then();
  }, []);

  const {nums, receiveResponse} = data;

  return (
      <ExampleWrap loading={!receiveResponse} noData={receiveResponse && nums.length === 0}>
      {/* content */}
      </ExampleWrap>
  );
}

const ExampleWrap = styled(LoadingContainer)`
  
`;
