'use client';

import styles from '@/components/pagination/index.module.scss';
import classNames from 'classnames';
import {useSearchParams} from 'next/navigation';
import {createPagination} from '@/utils/extend/pagination/composition';

export interface ControlledCorePaginationProps {
  onChange: (page: number) => void;
  currentPage: number;
}

export default function ControlledCorePagination({onChange, currentPage}: ControlledCorePaginationProps) {
  const searchParams = useSearchParams();
  /** TODO
   * createPagination() 에서 searchParams를 받아야할까?
   * URL 방식에서는 필요한게 맞는데,
   * onClick 방식에서는 필요가 없음.
   * 그래서 GPT 코드리뷰 내용대로
   * createPagination() 이걸 2가지 방식으로 분류하되 로직은 똑같이 쓸 수 있도록 하는게...
   */
  const pagination = createPagination({currentPage, searchParams, config: {size: 5, total: 100, limit: 10}});

  if (!pagination) {
    return null; // 게시글이 없어요 뭐 이런거 노출
  }

  const {elements} = pagination;

  return (
    <nav className={styles.nav}>
      {elements.map(({href, page, state}) => (
        <a
          key={href}
          className={classNames(styles.item, styles[state])}
          onClick={() => onChange(page)}
        >
          {page}
        </a>
      ))}
    </nav>
  );
}