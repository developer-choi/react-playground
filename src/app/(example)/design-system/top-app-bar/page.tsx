import styles from './page.module.scss';
import React from 'react';
import layoutStyles from '@/styles/layout.module.scss';
import TopAppBar from '@/components/layout/TopAppBar';
import {Body2} from '@/components/element/typography';

// URL: http://localhost:3000/design-system/top-app-bar
export default async function Page() {
  const title =
    'Update on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature in';
  const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  const appBarTitle = `[Notice] ${title}`;
  const isMobile = true;

  return (
    <div className={isMobile ? layoutStyles.horizontalPaddingContainer : layoutStyles.pageContentMedium}>
      <TopAppBar>{appBarTitle}</TopAppBar>
      <Body2 className={styles.content}>{content.repeat(10)}</Body2>
    </div>
  );
}
