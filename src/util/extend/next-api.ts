import type {NextApiRequest, NextApiResponse} from 'next';

/** Example
 *  https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/api/user/%5Bid%5D.ts
 */

export function getApi(req: NextApiRequest, res: NextApiResponse, callback: () => void) {
  apiHandler(req, res, 'GET', callback);
}

export function postApi(req: NextApiRequest, res: NextApiResponse, callback: () => void) {
  apiHandler(req, res, 'POST', callback);
}

export function putApi(req: NextApiRequest, res: NextApiResponse, callback: () => void) {
  apiHandler(req, res, 'PUT', callback);
}

export function deleteApi(req: NextApiRequest, res: NextApiResponse, callback: () => void) {
  apiHandler(req, res, 'DELETE', callback);
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function apiHandler(req: NextApiRequest, res: NextApiResponse, httpMethod: HttpMethod, callback: () => void) {
  const {method} = req;

  if (method !== httpMethod) {
    res.setHeader('Allow', [httpMethod])
    res.status(405).end(`Method ${method} Not Allowed`)
  } else {
    callback();
  }
}
