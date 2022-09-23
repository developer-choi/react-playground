import type {NextApiRequest, NextApiResponse} from 'next';
import type {CourseRoomsResponse} from '@type/response/course';

export default function rooms(req: NextApiRequest, res: NextApiResponse) {
  res.json(DUMMY_ROOMS);
}

export const DUMMY_ROOMS: CourseRoomsResponse = {
  list: [
    {
      pk: 1,
      name: '301호',
    },
    {
      pk: 2,
      name: '302호',
    },
    {
      pk: 3,
      name: '303호',
    }
  ]
};
