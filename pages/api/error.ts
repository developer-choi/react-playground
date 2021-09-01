import type { NextApiRequest, NextApiResponse } from 'next';

export default function error(req: NextApiRequest, res: NextApiResponse) {
  res.status(400).json({ error: 'error-message' });
}
