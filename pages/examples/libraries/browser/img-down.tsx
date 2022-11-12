import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Button} from '@component/atom/button/button-presets';
import axios, {AxiosError} from 'axios';

export default function Page() {

  const onClick = useCallback(async () => {
    try {
      const response = await axios.post('/api/method/post-some', {}, {
        withCredentials: undefined
      });
      console.log('api call success', response);
    } catch (error) {
      console.log('error', {...(error as AxiosError)});
    }
  }, []);

  return (
    <Wrap>
      <a href="/images/next-logo.png" download>클릭시 이미지 다운로드</a>
      <Button onClick={onClick}>CORS API 호출</Button>
      <ImageDownload mediaType="image/svg" src="http://localhost:8000/images/appStore.svg"/>
      <ImageDownload mediaType="image/png" src="http://localhost:3000/images/next-logo.png"/>
      <ImageDownload mediaType="image/png" src="https://s.pstatic.net/static/www/img/uit/sp_main_947f65.png"/>
    </Wrap>
  );
}

function ImageDownload({src, mediaType}: {src: string, mediaType: string}) {
  return (
    <a href={src} type={mediaType} download>
      <img src={src} alt="image" crossOrigin="use-credentials"/>
      {/*<img src={src} alt="image"/>*/}
    </a>
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
