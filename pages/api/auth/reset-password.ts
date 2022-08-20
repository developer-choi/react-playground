import type {NextApiRequest, NextApiResponse} from 'next';
import {putApi} from '@util/extend/next-api';

export default function resetPassword(req: NextApiRequest, res:NextApiResponse) {
  putApi(req, res, () => {
    res.status(200).send('');
  });
}
