import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Button} from '@components/atom/button/button-presets';

export default function PreventInClientPage() {
  const {query, push} = useRouter();
  
  useEffect(() => {
    if(query.block !== 'false') {
      push('./end').then();
    }
  }, [query, push]);
  
  return (
    <>
      <div>Start</div>
      <Link passHref prefetch={false} href="./end">
        <Button as="a">end페이지 가기</Button>
      </Link>
    </>
  );
}

