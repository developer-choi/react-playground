import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import Button from '@component/atom/element/Button';

export default function Page() {
  const [page, setPage] = useState(1);

  const increase = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const decrease = useCallback(() => {
    setPage(prevState => prevState - 1)
  }, []);

  return (
    <>
      <Link href={`/libraries/next/fallback/${page}`}>
        <a>
          fallback/{page} 페이지 가는 링크
        </a>
      </Link>
      <Button onClick={increase}>Increase</Button>
      <Button onClick={decrease}>Decrease</Button>
    </>
  );
}
