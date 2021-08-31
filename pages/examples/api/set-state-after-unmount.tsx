import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import {Button} from '@components/atom/button/button-presets';
import {useRunCallbackWhenMount} from '../../../src/utils/custom-hooks/useRunCallbackWhenMount';
import styled from 'styled-components';

export default function SetStateAfterUnmountPage() {
  
  const [visible, setVisible] = useState(true);
  
  const unmount = useCallback(() => {
    setVisible(false);
  }, []);
  
  return (
      <>
        <Head>
          <title>set-state-after-unmount</title>
        </Head>
        <Wrap>
          <Button onClick={unmount}>Children UnMount Button</Button>
          {visible && <UserInfo userPk="A"/>}
        </Wrap>
      </>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  > * {
    margin-bottom: 10px;
  }
`;

interface UserInfoProps {
  userPk: string;
}

function UserInfo({userPk}: UserInfoProps) {
  const runCallbackWhenMount = useRunCallbackWhenMount();
  const [data, setData] = useState<string>();
  
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserDataApi(userPk);
        runCallbackWhenMount(() => {
          setData(data);
        });
      } catch (error) {
        console.error(error);
      }
    })().then();
  }, [userPk, runCallbackWhenMount]);
  
  const refreshUserData = useCallback(async () => {
    try {
      const data = await getUserDataApi(userPk);
      runCallbackWhenMount(() => {
        setData(data);
      });
    } catch (error) {
      handleError();
    }
  }, [userPk, runCallbackWhenMount]);
  
  return (
      <>
        <Button onClick={refreshUserData}>get {userPk} user data</Button>
        <span>username = {data}</span>
      </>
  )
}

function getUserDataApi(userPk: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`John${userPk}`);
    }, 2000);
  });
}

function handleError() {

}
