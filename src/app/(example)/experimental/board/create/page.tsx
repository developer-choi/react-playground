'use client';

import {useCallback} from 'react';
import {deleteAllBoardsApi, postMultipleBoardsApi} from '@/utils/service/common/api/board-client';
import dayjs from 'dayjs';
import {randomInArray} from '@/utils/extend/random';
import {BoardRow} from '@/types/services/board';
import {range} from '@/utils/extend/data-type/number';
import Button from '@/components/element/Button';

// URL: http://localhost:3000/experimental/board/create
export default function Page() {
  const initialize = useCallback(async () => {
    await deleteAllBoardsApi();

    const createdAt = dayjs().format('HH:mm:ss');
    postMultipleBoardsApi(range(1, 100).map(value => {
      const type = randomInArray<BoardRow['type']>(['free', 'gallery'], 1)[0];

      return {
        title: `[${type}] - ${value}번 게시글 - ${createdAt}`,
        type
      };
    }));
  }, []);

  return (
    <div>
      <Button onClick={initialize}>모두 삭제 후 글 100개 만들기</Button>
    </div>
  );
}
