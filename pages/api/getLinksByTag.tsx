import { NextApiRequest, NextApiResponse } from "next"

import nav from "../../nav.json"

const allTags:  Map<string, number[]> = getAllTags()

function getAllTags(): Map<string, number[]> {
      const tags: Map<string, number[]> = new Map()
      nav.links.forEach(
            (link, index) => {
                  link.tags.forEach(
                        (tag) => {
                              if (tags.has(tag)) {
                                    tags.get(tag)?.push(index)
                              } else {
                                    tags.set(tag, [index])
                              }
                        }
                  )
            }
      )

      return tags
}

export default function handler(
      req: NextApiRequest,
      res: NextApiResponse<number[]>
) {
      res.status(200).json(allTags.get(req.query.tag as string) ?? [])
}