import type {NextApiRequest, NextApiResponse} from "next";
import cors from "cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({message: "Hello Everyone"});
}
