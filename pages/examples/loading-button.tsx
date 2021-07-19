import React, {useCallback} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import LoadingButton from '@components/atom/button/LoadingButton';

export default function LoadingButtonPage() {
  
  const callApi = useCallback(async () => {
    await timeoutPromise(1500);
  }, []);
  
  return (
      <>
        <Head>
          <title>loading-button</title>
        </Head>
        <div>
          <StyledLoadingButton color="white" size={18} loadingAfterClick={callApi}>
            저장
          </StyledLoadingButton>
        </div>
      </>
  );
}

function timeoutPromise(timeout: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
}

const StyledLoadingButton = styled(LoadingButton)`
  background-color: red;
  border-radius: 5px;
  padding: 10px 25px;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;
