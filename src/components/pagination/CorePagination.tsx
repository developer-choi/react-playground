import Link, {LinkProps} from 'next/link';
import styles from './index.module.scss';
import classNames from 'classnames';
import {createPagination, CreatePaginationParam} from '@/utils/extend/pagination/composition';

interface CorePaginationProps extends CreatePaginationParam {
}

export default function CorePagination(props: CorePaginationProps) {
  const pagination = createPagination(props);

  if (!pagination) {
    return null; // 게시글이 없어요 노출
  }

  const {first, previous, elements, next, last} = pagination;

  return (
    <nav className={styles.nav}>
      <Link
        href={first.href}
        className={classNames(styles.item, styles[first.state])}
        {...COMMON_LINK_PROPS}
      >
        {'<<'}
      </Link>

      <Link
        href={previous.href}
        className={classNames(styles.item, styles[previous.state])}
        {...COMMON_LINK_PROPS}
      >
        {'<'}
      </Link>

      {elements.map(({page, href, state}) => (
        <Link
          key={href}
          href={href}
          className={classNames(styles.item, styles[state])}
          {...COMMON_LINK_PROPS}
        >
          {page}
        </Link>
      ))}

      <Link
        href={next.href}
        className={classNames(styles.item, styles[next.state])}
        {...COMMON_LINK_PROPS}
      >
        {'>'}
      </Link>

      <Link
        href={last.href}
        className={classNames(styles.item, styles[last.state])}
        {...COMMON_LINK_PROPS}
      >
        {'>>'}
      </Link>
    </nav>
  );
}

const COMMON_LINK_PROPS: Omit<LinkProps, 'href'> = {
  scroll: false,
  prefetch: false
};
