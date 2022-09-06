import type {NextApiRequest, NextApiResponse} from 'next';
import {getApi} from '@util/extend/next-api';
import {BOARD_LIST} from '@pages/api/board/list';

export default function one(req: NextApiRequest, res: NextApiResponse) {
  getApi(req, res, () => {
    const pk = Number(req.query.pk);
    const findItem = BOARD_LIST.find(board => board.pk === pk);

    if (findItem) {
      res.json({board: findItem});

    } else {
      res.status(404).send({message: 'The article is not exist.'});
    }
  });
}
