import type {NextApiRequest, NextApiResponse} from 'next';
import type {Board} from '@type/response-sub/board-sub';
import {getDiffDate} from '@util/extend/date/date-util';
import {getApi} from '@util/extend/next-api';
import {TEST_USER} from '@pages/api/auth/login';

export default function list(req: NextApiRequest, res: NextApiResponse) {
  getApi(req, res, () => {
    res.status(200).json({total: BOARD_LIST.length, page: 1, list: BOARD_LIST});
  });
}

export const BOARD_LIST: Board[] = [
  {pk: 1, title: '게시글제목1', content: '게시글내용1', isLike: false, timestamp: getDiffDate(new Date(), [0, 0, -1]).getTime(), boardType: 'FREE', authorUserPk: TEST_USER.userPk},
  {pk: 2, title: '게시글제목2', content: '게시글내용2', isLike: false, timestamp: getDiffDate(new Date(), [0, 0, -2]).getTime(), boardType: 'FREE', authorUserPk: TEST_USER.userPk},
  {pk: 3, title: '게시글제목3', content: '게시글내용3', isLike: false, timestamp: getDiffDate(new Date(), [0, 0, -3]).getTime(), boardType: 'FREE', authorUserPk: 2}
];
