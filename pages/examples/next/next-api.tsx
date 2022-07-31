import React, {useCallback, useState} from 'react';
import {Button} from '@component/atom/button/button-presets';
import RadioGroup from '@component/atom/RadioGroup';
import type {HttpMethod} from '@util/extend/next-api';
import RadioLabel from '@component/atom/RadioLabel';
import axios from 'axios';

export default function Page() {
  const [method, setMethod] = useState<HttpMethod>('GET');

  const callGetApi = useCallback(async () => {
    const {data} = await axios[method.toLowerCase() as 'get' | 'post']('/api/method/get-some');
    console.log(data);
  }, [method]);

  const callPostApi = useCallback(async () => {
    await axios[method.toLowerCase() as 'get' | 'post']('/api/method/post-some');
  }, [method]);

  return (
    <>
      <RadioGroup name="method" value={method} onChange={setMethod}>
        <RadioLabel value="GET" label="GET"/>
        <RadioLabel value="POST" label="POST"/>
      </RadioGroup>
      <Button onClick={callGetApi}>GET API 호출</Button>
      <Button onClick={callPostApi}>POST API 호출</Button>
    </>
  );
}
