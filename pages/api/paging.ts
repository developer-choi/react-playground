import type {NextApiRequest, NextApiResponse} from 'next';
import {range} from '@util/extend/number';
import {randomHexColor} from '@util/extend/random';

export interface PagingListType {
  order: number;
  key: number;
  color: string;
}

const API_ARTICLE_PER_PAGE = 20;

export default function paging(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page) ?? 1;
  
  const list: PagingListType[] = range(1, 1000).map(value => ({
    order: value,
    key: new Date().getTime() + value * 1000 * 60 * 60,
    color: randomHexColor()
  }));
  
  res.json({
    list: list.slice((page - 1) * API_ARTICLE_PER_PAGE, page * API_ARTICLE_PER_PAGE),
    page,
    total: list.length,
    status: 200
  });
}
