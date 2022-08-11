import React from 'react';
import {getSSPForNotLoggedIn} from '@util/auth/auth';

export default function Page() {
  return (
    <>
      비밀번호 찾기
    </>
  );
}

export const getServerSideProps = getSSPForNotLoggedIn;
