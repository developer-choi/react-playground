'use client';

import {useCallback} from 'react';
import {range} from '@/utils/extend/data-type/number';
import dayjs from 'dayjs';
import {deleteAllBoardsApi, postMultipleBoardsApi} from '@/utils/service/api/board';
import {randomInArray} from '@/utils/extend/test/random';
import {BoardRow} from '@/types/services/board';
import Button from '@/components/element/Button';

// URL: http://localhost:3000/board/test
export default function Page() {
  const initialize = useCallback(async () => {
    await deleteAllBoardsApi();

    const createdAt = dayjs().format('HH:mm:ss');
    postMultipleBoardsApi(range(1, 100).map(value => ({
      title: `${value}번 게시글 - ${createdAt}`,
      type: randomInArray<BoardRow['type']>(['gallery', 'free'], 1)[0]
    })));
  }, []);

  return (
    <div>
      <Button onClick={initialize}>모두 삭제 후 글 100개 만들기</Button>
    </div>
  );
}
