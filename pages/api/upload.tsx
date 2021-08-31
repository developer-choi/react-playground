import type {NextApiRequest, NextApiResponse, PageConfig} from 'next';

export default function upload(req: NextApiRequest, res: NextApiResponse) {
  res.send('hello');
}

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: '100000mb'
    }
  }
};
