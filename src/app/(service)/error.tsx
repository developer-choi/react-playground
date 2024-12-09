'use client';

import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';
import {ErrorPageProps} from '@/types/declaration/next';

// 서비스에 대한 대부분의 에러는 이 페이지가 보임.
export default function ErrorPage({}: ErrorPageProps) {
  // 최소한의 전역처리 포함. (로그인 한 계정의 국적에 맞는 언어로 다국어 처리 한다거나...)
  return (
    <ErrorPageTemplate title="Internal Server Error" content="새로고침해보세요, 지속되면 관리자 문의 해주세요"/>
  );
}
