import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '@component/atom/button/button-presets';
import styled from 'styled-components';

export default function SetStateAfterUnmountPage() {

  const [visible, setVisible] = useState(true);

  const unmount = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Wrap>
      <Button onClick={unmount}>아래 버튼 누르고 2초안에 누르세요</Button>
      {visible && <UserInfo userPk="A"/>}
    </Wrap>
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
  const [data, setData] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserDataApi(userPk);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })().then();
  }, [userPk]);

  const refreshUserData = useCallback(async () => {
    try {
      const data = await getUserDataApi(userPk);
      setData(data);
    } catch (error) {
      handleError();
    }
  }, [userPk]);

  return (
    <>
      <Button onClick={refreshUserData}>get {userPk} user data</Button>
      <span>username = {data}</span>
    </>
  );
}

function getUserDataApi(userPk: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Api respond data');
      resolve(`John${userPk}`);
    }, 2000);
  });
}

function handleError() {

}
