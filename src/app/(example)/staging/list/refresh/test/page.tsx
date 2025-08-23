'use client';

import {useCallback} from 'react';
import {range, Button} from '@forworkchoe/core';
import dayjs from 'dayjs';
import {deleteAllBoardsApi, postMultipleBoardsApi} from '@/utils/service/common/api/board-client';
import {randomInArray} from '@/utils/extend/random';
import {BoardRow} from '@/types/services/board';

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
