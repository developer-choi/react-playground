import type {NextApiRequest, NextApiResponse} from 'next';
import {postApi} from '@util/extend/next-api';
import {getDiffDate} from '@util/extend/date/date-util';
import type {UserInfo} from '@type/response-sub/user-sub';
import type {LoginToken} from '@util/auth/auth';
import SHA512 from 'sha512-es';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  postApi(req, res, () => {
    const {email, password} = req.body;

    if (email !== 'test-email@test.com') {
      res.status(400).json({message: 'The email is not exist.'});

    } else if(password !== PASSWORD_HASH) {
      res.status(400).json({message: 'The password is not valid.'});

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
  userPk: 1,
  anotherValue: 'abc1234'
};

export const TEST_USER: UserInfo = {
  userPk: 1,
  name: 'test-name'
};

const PASSWORD_HASH = SHA512.hash('test-password');
