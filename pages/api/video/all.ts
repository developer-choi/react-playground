import type {NextApiRequest, NextApiResponse} from 'next';
import {ALL_VIDEOS} from '@pages/api/video/one';

export default function videos(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    status: 200,
    videos: ALL_VIDEOS
  });
}
