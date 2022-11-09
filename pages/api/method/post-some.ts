import type {NextApiRequest, NextApiResponse} from 'next';
import {postApi} from '@util/extend/next-api';

export default function postSome(req:NextApiRequest, res:NextApiResponse) {
  postApi(req, res, () => {
    console.log('SERVER RESPONSE BODY', req.body);
    res.status(200).send('SUCCESS');
  });
}
