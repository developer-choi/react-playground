import React, {useState} from 'react';
import Head from 'next/head';
import MainLayout from '@components/layouts/MainLayout';
import BugInputNumber from '@components/bug/BugInputNumber';

export default function InputBugExamplePage() {
  const [value, setValue] = useState('');
  //123-123-123 순서대로 한글자씩 입력해보면 -가 입력되는 버그가 있음. 분명 기본값에 의해 ignoreValues로 '-'를 전달했는데도.
  return (
      <>
        <Head>
          <title>input-bug-example</title>
        </Head>
        <MainLayout>
          <BugInputNumber style={{border: '1px solid blue'}} value={value} onChangeText={setValue}/>
        </MainLayout>
      </>
  );
}
