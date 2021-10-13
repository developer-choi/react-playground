import React, {ComponentPropsWithoutRef, PropsWithChildren, useEffect, useState} from 'react';
import styled from 'styled-components';

export interface LoadingContainerProp extends PropsWithChildren<ComponentPropsWithoutRef<'div'>> {
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

//일반적으로 type의 common성격의 파일에 있을것.
export interface ReceiveResponse {
  receiveResponse: boolean;
}

export async function apiGetNumbers() {
  return {
    nums: [1, 2, 3, 4]
  };
}

function handleError(error: any) {
  console.error(error);
}

export function LoadingExample() {
  
  /**
   * ReceiveResponse를 별도의 interface로 만들어서 state generic만들 때 활용
   */
  const [data, setData] = useState<{nums: number[]} & ReceiveResponse>({
    nums: [],
    receiveResponse: false
  });

  useEffect(() => {
    (async () => {
      try {
        /**
         * receiveResponse를 true로 만드는곳은 api****()가 아니라 컴포넌트에서 결정.
         * api에서 receiveResponse라는 값을 응답하는게 아니기떄문.
         */
        const {nums} = (await apiGetNumbers());
        setData({receiveResponse: true, nums});
      } catch (error) {
        handleError(error);
      }
      
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
