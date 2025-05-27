import React from 'react';
import ErrorPageTemplate from '@/components/error/ErrorPageTemplate';

export default async function Page() {
  return (
    <ErrorPageTemplate title="Not Found" content="없는 페이지니까, URL 확인해주세요"/>
  );
}
