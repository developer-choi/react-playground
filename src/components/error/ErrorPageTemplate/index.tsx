import {Body1, H1} from '@/components/element/typography';
import layoutStyles from '@/styles/layout.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
import {CustomizedError} from '@/utils/service/error';
import React from 'react';
import {InvalidAccessError} from '@/utils/service/error/server-side';

export interface ErrorPageTemplateProps {
  title: string;
  content: string;
}

// URL: https://docs.google.com/document/d/1fZMQM2K6BaFh4KScvHqraM1s1Y31sp82u9ZsjeDQT18/edit?tab=t.0
export default function ErrorPageTemplate({title, content}: ErrorPageTemplateProps) {
  return (
    <div className={styles.outerContainer}>
      <div className={classNames(layoutStyles.pageContentMedium, styles.innerContainer)}>
        <H1>{title}</H1>
        <Body1>{content}</Body1>
      </div>
    </div>
  );
}

export interface CustomizedErrorPageProps {
  error: CustomizedError;
}

// 에러 종류별 에러 페이지 (타이틀, 메시지) 노출하기 위함.
// Server Side (handleServerSideError) / Client Side (error.tsx) 둘 다 렌더링 시점에 에러가 발생할 수 있으니까.
export function CustomizedErrorPage({error}: CustomizedErrorPageProps) {
  if (error instanceof InvalidAccessError) {
    return (
      <ErrorPageTemplate title="Invalid Access" content={error.message}/>
    );
  }

  return <InternalServerErrorPage/>;
}

export function InternalServerErrorPage() {
  return (
    <ErrorPageTemplate title="Internal Server Error" content="새로고침해보세요, 지속되면 관리자 문의 해주세요"/>
  );
}
