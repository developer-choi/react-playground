import React, {useState} from 'react';
import Head from 'next/head';

export default function HydrationPage() {
  const [value] = useState(() => {
    try {
      console.log(localStorage); // ReferenceError is occurred here when rendering in Server.
      return 'success';
    } catch (error) {
      return 'error';
    }
  });
  
  return (
    <>
      <Head>
        <title>drag-and-drop page</title>
      </Head>
      <div>{value}</div>
    </>
  );
}
