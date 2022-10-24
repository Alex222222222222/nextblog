import { getLinkByCategory } from "../../lib/nav";

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<number[]>
) {

      res.status(200).json(getLinkByCategory(req.query.category as string));
}
