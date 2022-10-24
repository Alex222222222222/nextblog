import { NextApiRequest,NextApiResponse } from "next"

import { getAllTags } from "../../lib/tag"

const allTags:string[] = getAllTags()


export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<string[]>
) {
	res.status(200).json(allTags)
}