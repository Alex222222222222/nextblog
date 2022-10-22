import type { NextApiRequest, NextApiResponse } from 'next'

import { URLLink, blankLink } from '../../interface/link'

import { getLinkFromID } from '../../lib/link'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<URLLink>
) {
      const body = JSON.parse(req.body)

      if (!body) {
            res.status(404).json(blankLink)
            return
      }

      const id:string = body["id" as keyof typeof body]
      if (!id) {
            res.status(404).json(blankLink)
            return
      }

	res.status(200).json(getLinkFromID(id))
}
