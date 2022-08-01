import type {NextApiRequest, NextApiResponse} from 'next';
import {getApi} from '@util/extend/next-api';

export default function getSome(req:NextApiRequest, res:NextApiResponse) {
  getApi(req, res, () => {
    res.status(200).send('hello world');
  });
}
