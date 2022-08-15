import type {NextApiRequest, NextApiResponse} from 'next';
import {postApi} from '@util/extend/next-api';
import {getDiffDate} from '@util/extend/date/date-util';
import type {UserInfo} from '@type/response-sub/user-sub';
import type {LoginToken} from '@util/auth/auth';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  postApi(req, res, () => {
    const {email, password} = req.body;

    if (email !== 'test-email' || password !== 'test-password') {
      res.status(400);
    } else {
      const expire = getDiffDate(new Date(), [2]).toUTCString();

      res
        .setHeader('Set-Cookie', [`userPk=${TEST_TOKEN.userPk}; path=/; Expires=${expire};`, `anotherValue=${TEST_TOKEN.anotherValue}; path=/; Expires=${expire};`])
        .status(200)
        .json({info: TEST_USER});
    }
  });
}

export const TEST_TOKEN: LoginToken = {
  userPk: 1234,
  anotherValue: 'abc1234'
};

export const TEST_USER: UserInfo = {
  userPk: 1234,
  name: 'test-name'
};
