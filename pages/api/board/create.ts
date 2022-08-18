import type {NextApiRequest, NextApiResponse} from 'next';
import {postApi} from '@util/extend/next-api';
import type {BoardCreateParam} from '@api/BoardApi';
import {BOARD_LIST} from '@pages/api/board/list';

export default function create(req: NextApiRequest, res: NextApiResponse) {
  postApi(req, res, async () => {
    const {title, content, boardType} = req.body as BoardCreateParam;
    const lastBoard = BOARD_LIST[BOARD_LIST.length - 1];

    BOARD_LIST.push({
      pk: lastBoard.pk + 1,
      boardType,
      title,
      content,
      isLike: false,
      timestamp: new Date().getTime()
    });

    res.status(200).send('');
  });
}
