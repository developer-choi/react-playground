import type {NextApiRequest, NextApiResponse} from 'next';

export default function video(req: NextApiRequest, res: NextApiResponse) {
  const pk = Number(req.query.pk ?? 0);
  res.json({
    status: 200,
    video: {url: VIDEOS[pk]}
  });
}

const VIDEOS = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
];
