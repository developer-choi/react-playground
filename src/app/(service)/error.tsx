'use client';

import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

// 서비스에 대한 대부분의 에러는 이 페이지가 보임.
export default function ErrorPage({}: ErrorPageProps) {
  return (
    <ErrorPageTemplate title="Internal Server Error" content="새로고침해보세요, 지속되면 관리자 문의 해주세요"/>
  );
}
