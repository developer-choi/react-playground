import type {NextApiRequest, NextApiResponse} from 'next';

export default function age(request: NextApiRequest, response: NextApiResponse) {
  try {
    const age = request.query?.name?.length as number;
    response.json({age});
  } catch (error) {
    response.json({age: 0});
  }
}

// GET /paging/age
export interface AgeResponse {
  age: number;
}
