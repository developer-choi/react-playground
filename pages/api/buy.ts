import type {NextApiRequest, NextApiResponse} from "next";

export default function buySomething(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    headers: req.headers
  });
}
