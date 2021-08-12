import type {NextApiRequest, NextApiResponse} from 'next';
import {getNumberArray} from '../../../src/utils/extend/number';

export interface Mail {
  pk: number;
  important: boolean;
  title: string;
  content: string;
}

const DUMMY_MAILS: Mail[] = getNumberArray(1, 10).map(value => ({
  pk: value,
  important: value % 2 === 0,
  title: `메일제목${value}`,
  content: `메일내용${value}`,
}));

export default function mail(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    mails: DUMMY_MAILS
  });
}
