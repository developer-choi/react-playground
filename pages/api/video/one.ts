import type {NextApiRequest, NextApiResponse} from 'next';
import type {Video} from '@type/response/video';

export default function video(req: NextApiRequest, res: NextApiResponse) {
  const pk = Number(req.query.pk ?? 0);
  
  const video = ALL_VIDEOS.find((video) => pk === video.pk);
  
  if (!video) {
    res.status(404).send('');
    
  } else {
    res.json({
      status: 200,
      video: {
        pk,
        url: video.url
      }
    });
  }
}

export const ALL_VIDEOS: Video[] = [
  {
    pk: 0,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
  },
  {
    pk: 1,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg'
  },
  {
    pk: 2,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg'
  }
];
