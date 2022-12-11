import type {NextApiRequest, NextApiResponse} from 'next';
import {postApi} from '@util/extend/next-api';
import type {MethodPostSomeBody} from '@type/response/method';
import type {MethodGetSomeResponse} from '@type/response/method';

export default function postSome(req:NextApiRequest, res:NextApiResponse) {
  postApi(req, res, () => {
    const body = req.body as MethodPostSomeBody;
    console.log('SERVER RESPONSE BODY', body);
    SOME.value = body.value;
    res.status(200).send('SUCCESS');
  });
}

export const SOME: MethodGetSomeResponse = {
  value: 'DEFAULT_VALUE'
};
