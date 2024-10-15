import {useCallback} from 'react';
import {deleteAllBoardsApi, postMultipleBoardsApi} from '@/utils/service/api/board';
import dayjs from 'dayjs';
import {range} from 'lodash';
import {randomInArray} from '@/utils/extend/test/random';
import {BoardRow} from '@/types/services/board';

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
      <button onClick={initialize}>모두 삭제 후 글 100개 만들기</button>
    </div>
  );
}
