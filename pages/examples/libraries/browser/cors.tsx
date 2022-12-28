import React, {useCallback} from 'react';
import styled from 'styled-components';
import Button from '@component/atom/element/Button';
import axios, {AxiosError} from 'axios';
import {downloadImage} from '@util/extend/download';

export default function Page() {
  const onClick = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:8000/buy/expensive', {}, {
        // withCredentials: true
      });
      console.log('api call success', response);
    } catch (error) {
      console.log('error', {...(error as AxiosError)});
    }
  }, []);

  const down = useCallback(() => {
    const url = 'http://localhost:8000/images/appStore.svg';
    const filename = 'download.png';
    downloadImage(url, filename);
  }, []);

  return (
    <Wrap>
      <a href="/images/next-logo.png" download>클릭시 이미지 다운로드</a>
      <Button onClick={onClick}>CORS API 호출</Button>
      <Button onClick={down}>이미지 다운</Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    padding: 5px;
  }
`;
