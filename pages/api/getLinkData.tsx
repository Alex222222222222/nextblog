import type { NextApiRequest, NextApiResponse } from 'next'

import { URLLink, blankLink } from '../../interface/link'

import { getLinkFromID } from '../../lib/link'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<URLLink>
) {

	res.status(200).json(getLinkFromID(req.query.id as string))
}
