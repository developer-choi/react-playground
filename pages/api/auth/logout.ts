import type {NextApiRequest, NextApiResponse} from 'next';
import {postApi} from '@util/extend/next-api';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  postApi(req, res, () => {
    res.status(200).send('');
  });
}
