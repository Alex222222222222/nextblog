import {  getSortedPostData } from "../../lib/posts";
import categories from "../../posts/category.json"

import type { NextApiRequest, NextApiResponse } from 'next'

import { PostCategorySidebarData } from "../../interface/post";

const returnData = postCategoryData()

export default function handler(
      req: NextApiRequest,
            res: NextApiResponse<PostCategorySidebarData[]>,
) {
      res.status(200).json(returnData)
}

function postCategoryData():PostCategorySidebarData[]{
      const allPostData = getSortedPostData()
      const allPostCategory = categories.category.map(({ name, icon }): PostCategorySidebarData => {
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