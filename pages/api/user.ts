import type {NextApiRequest, NextApiResponse} from 'next';
import {getApi} from '@util/extend/next-api';
import type {UserInfo} from '@type/response-sub/user-sub';

export default function user(req: NextApiRequest, res: NextApiResponse) {
  getApi(req, res, () => {
    const userPk = Number(req.query.userPk);

    if (userPk !== TEST_USER.userPk) {
      res.status(404).send('');
      return;

    } else {
      res.status(200).json({info: TEST_USER});
    }
  });
}

const TEST_USER: UserInfo = {
  userPk: 1,
  name: 'test-name'
};
