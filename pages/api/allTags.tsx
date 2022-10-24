import { NextApiRequest,NextApiResponse } from "next"

import nav from "../../nav.json"

const allTags:string[] = getAllTags()

function getAllTags():string[] {
      const tags = nav.links.map((link) => link.tags).flat()
      return tags
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<string[]>
) {
	res.status(200).json(allTags)
}