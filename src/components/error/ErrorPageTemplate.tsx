'use client';

import {Body1, H1} from '@/components/element/typography';
import layoutStyles from '@/styles/layout.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
import React from 'react';
import Button, {ButtonLink, ButtonProps} from '@/components/element/Button';

/**
 * URL: https://docs.google.com/document/d/1fZMQM2K6BaFh4KScvHqraM1s1Y31sp82u9ZsjeDQT18/edit?tab=t.0
 *
 * 아무런 비즈니스로직 없이, 오로지 에러페이지 화면을 보여주기 위한 컴포넌트
 */
export interface ErrorPageTemplateProps {
  title: string;
  content?: string;
  button?:
    | {
    type: 'link';
    text: string;
    href: string;
  }
    | {
    type: 'button';
    text: string;
    onClick: ButtonProps['onClick'];
  };
  fullScreen: boolean; // error.tsx에서는 true / server side에서 에러난 경우 true / 그 외 나머지 false (ErrorBoundary의 fallback으로 전달한다거나 하는 경우 false)
}

// URL: https://docs.google.com/document/d/1fZMQM2K6BaFh4KScvHqraM1s1Y31sp82u9ZsjeDQT18/edit?tab=t.0
export default function ErrorPageTemplate({title, content, button = DEFAULT_BUTTON, fullScreen}: ErrorPageTemplateProps) {
  return (
    <div className={classNames(styles.outerContainer, { [styles.fullScreen]: fullScreen })}>
      <div className={classNames(layoutStyles.pageContentMedium, styles.innerContainer)}>
        <H1>{title}</H1>
        <Body1>{content}</Body1>
        {button &&
          (button.type === 'link' ? (
            <ButtonLink href={button.href} size="large">
              {button.text}
            </ButtonLink>
          ) : (
            <Button onClick={button.onClick} size="large">
              {button.text}
            </Button>
          ))}
      </div>
    </div>
  );
}

const DEFAULT_BUTTON: ErrorPageTemplateProps['button'] = {
  type: 'button',
  text: '새로고침',
  onClick: () => {
    location.reload();
  },
};
