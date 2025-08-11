import {getBoardListApi} from '@/utils/service/common/api/board-client';
import CorePagination from '@/components/pagination/CorePagination';
import {PageServerComponentProps} from '@/types/declaration/next';
import styles from './page.module.scss';
import {BoardRow} from '@/types/services/board';
import {Suspense} from 'react';

// URL: http://localhost:3000/experimental/list/pagination
// Doc: https://docs.google.com/document/d/18uixuUU9rpzDBMUEgxfB2TBx9Tr9SApG18c1rFoaOJs/edit?tab=t.0#heading=h.cxti5arqx98q
export default function Page(props: PageServerComponentProps) {
  return (
    <main className={styles.page}>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <List {...props}/>
      </Suspense>
    </main>
  );
}

async function List({searchParams}: PageServerComponentProps) {
  const response = await getBoardListApi({page: Number(searchParams.page ?? 1), limit: 10, filter: searchParams.filter as BoardRow['type'] | undefined});

  if (response.list.length === 0) {
    return (
      <div style={{padding: 64}}>목록이 없어요</div>
    )
  }

  return (
    <ul>
      {response.list.map((board, index) => (
        <li key={board.pk} id={index === 0 ? TOP_SELECTOR : undefined} className={styles.row}>{board.title}</li>
      ))}
      <CorePagination searchParams={searchParams} config={{limit: 10, total: response.total, size: 5}}/>
    </ul>
  );
}

const TOP_SELECTOR = 'TOP_SELECTOR';
