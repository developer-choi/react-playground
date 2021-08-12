import type {NextApiRequest, NextApiResponse} from 'next';
import {getNumberArray} from '../../../src/utils/extend/number';

export interface TermsOfUse {
  pk: number;
  content: string;
  required: boolean;
}

const DUMMY_TERMS: TermsOfUse[] = getNumberArray(1, 10).map(value => {
  
  const required = value % 2 === 0;
  
  return {
    pk: value,
    required,
    content: `약관${value} ${required ? '(필수)' : ''}`
  };
});

export default function terms(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    terms: DUMMY_TERMS
  });
}
