import type {NextApiRequest, NextApiResponse} from 'next';
import {Category} from '@type/response-sub/category-sub';

export default function list(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    categories: totalCategories
  });
}

const totBags = [
  new Category(3, '아디다스토트백', []),
  new Category(4, '나이키토트백', [])
];

const bagCategories = [
  new Category(1, '토트백', totBags),
  new Category(2, '벨트백', [])
];

const walletCategories = [
  new Category(11, '장지갑', []),
  new Category(12, '카드지갑', [])
];

const clothesCategories = [
  new Category(101, '아우터', []),
  new Category(102, '스커트', [])
];

const shoesCategories = [
  new Category(1001, '하이힐', []),
  new Category(1002, '부츠', [])
];

const totalCategories = [
  new Category(0, '가방', bagCategories),
  new Category(10, '지갑', walletCategories),
  new Category(100, '의류', clothesCategories),
  new Category(1000, '슈즈', shoesCategories)
];
