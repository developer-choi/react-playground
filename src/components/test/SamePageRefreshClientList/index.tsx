'use client';

import {BoardRow} from '@/types/services/board';
import {useCallback} from 'react';
import {deleteBoardApi, patchBoardApi, postBoardApi} from '@/utils/service/common/api/board-client';
import {revalidateTagOnServerAction} from '@/utils/extend/library/server-action';
import dayjs from 'dayjs';
import {Button} from '@forworkchoe/core/components';

export interface SamePageRefreshClientListProps {
  list: BoardRow[];
}

export default function SamePageRefreshClientList({list}: SamePageRefreshClientListProps) {
  const post = useCallback(async () => {
    await postBoardApi({
      title: `(created) - ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
      type: 'free'
    });
    await revalidateTagOnServerAction('board-list');
  }, []);

  const deleteBoard = useCallback(async (pk: number) => {
    await deleteBoardApi(pk);
    await revalidateTagOnServerAction('board-list');
  }, []);

  const patchBoard = useCallback(async (pk: number) => {
    await patchBoardApi({
      pk,
      title: `(modified) - ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
      type: 'gallery'
    });
    await revalidateTagOnServerAction('board-list');
  }, []);

  return (
    <>
      <Button size="large" onClick={post}>Post</Button>
      {list.map(({pk, title}) => (
        <div key={pk} style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 12}}>
          <h2>{title}</h2>
          <Button color="secondary" size="small" onClick={() => deleteBoard(pk)}>Delete</Button>
          <Button color="secondary" size="small" onClick={() => patchBoard(pk)}>Patch</Button>
        </div>
      ))}
    </>
  );
}
