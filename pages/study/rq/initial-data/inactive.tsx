import React from 'react';
import Link from 'next/link';

/**
 * initial-data의 index 테스트를 위한 페이지 (queryKey를 inactive상태로만들기 위한 페이지)
 */
export default function Page() {
  return (
    <Link href="/study/rq/initial-data/destination">
      /study/rq/initial-data/destination
    </Link>
  );
}
