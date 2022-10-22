import {  getSortedPostData } from "../../lib/posts";
import categories from "../../posts/category.json"

import type { NextApiRequest, NextApiResponse } from 'next'

const returnData = postCategoryData()

export type PostCategory = {
      name: string,
      icon: string,
      postsCNT: number,
}

export default function handler(
      req: NextApiRequest,
            res: NextApiResponse<PostCategory[]>,
) {
      res.status(200).json(returnData)
}

function postCategoryData():PostCategory[]{
      const allPostData = getSortedPostData()
      const allPostCategory = categories.category.map(({ name, icon }): PostCategory => {
            return {
                  name,
                  icon,
                  postsCNT: 0,
            }
      })

      allPostData.forEach(({ category }) => {
            category.forEach((value) => {
                  allPostCategory.forEach(({ name }, index) => {
                        if (name == value) {
                              allPostCategory[index].postsCNT += 1
                        }
                  })
            })
      });


      return allPostCategory
}