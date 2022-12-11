import type {NextApiRequest, NextApiResponse} from 'next';
import {getApi} from '@util/extend/next-api';
import {SOME} from '@pages/api/method/post-some';

export default function getSome(req:NextApiRequest, res:NextApiResponse) {
  getApi(req, res, () => {
    res.status(200).json(SOME);
  });
}
