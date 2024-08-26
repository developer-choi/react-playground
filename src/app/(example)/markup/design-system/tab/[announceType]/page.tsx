import layoutStyles from '@/styles/layout.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
import React from 'react';
import CustomLink from '@/components/element/link/CustomLink';
import TabBar, {TabBarItem} from '@/components/layout/TabBar';
import {isMobileOnBothSide} from '@/utils/extend/library/next';

/**
 * URL: http://localhost:3000/markup/design-system/tab/notice
 * Doc : https://docs.google.com/document/d/1I9RL3PafRfNwzKa7ZTvChWVygDlGWGyr57qSmr4FqOY/edit#heading=h.za52bsfg8q5d
 */
export default function Page() {
  const isMobile = isMobileOnBothSide();
  const pageContent = isMobile ? layoutStyles.mobilePageContent : layoutStyles.pageContentMedium;

  return (
    <main className={pageContent}>
      <TabBar widthMode="equal-rate" activeMode="startsWith" linkList={tabBarLinkList} />
      {articleList.length > 0 && (
        <div className={styles.articleListWrap}>
          {articleList.map(({ id, title, date, haveRed, important }) => (
            <CustomLink key={id} className={styles.article} href={`/markup/design-system/top-app-bar`}>
              <span className={classNames(styles.title, { [styles.haveRed]: haveRed, [styles.important]: important })}>
                {title}
              </span>
              <span className={styles.date}>{date}</span>
            </CustomLink>
          ))}
        </div>
      )}
    </main>
  );
}

const tabBarLinkList: TabBarItem[] = [
  {
    href: '/markup/design-system/tab/notice',
    children: 'Notice',
  },
  {
    href: '/markup/design-system/tab/instruction',
    children: 'Instruction',
  },
  {
    href: '/markup/design-system/tab/policy',
    children: 'Policy',
  },
];

interface Article {
  id: number;
  title: string;
  important: boolean;
  haveRed: boolean;
  date: string;
}

const articleList: Article[] = [
  {
    id: 1,
    title:
      'Update on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature in',
    haveRed: false,
    important: true,
    date: '2022.03.24',
  },
  {
    id: 2,
    title:
      'Update on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature in',
    haveRed: true,
    important: false,
    date: '2022.03.24',
  },
  {
    id: 3,
    title:
      'Update on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature in',
    haveRed: false,
    important: false,
    date: '2022.03.24',
  },
];
