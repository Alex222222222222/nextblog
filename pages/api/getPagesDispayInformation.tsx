import { PostDisplayData } from "../../interface/post";
import { getAllPostDisplayDataFromSortedData } from "../../lib/posts";

import { NextApiRequest, NextApiResponse } from "next";

const allPostDisplayDataFromSortedData = getAllPostDisplayDataFromSortedData()

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostDisplayData>
) {
      const { post } = req.query;
      if (allPostDisplayDataFromSortedData.has(post as string)) {
            res.status(200).json(allPostDisplayDataFromSortedData.get(post as string) as PostDisplayData);
      } else {
            res.status(404).json({} as PostDisplayData);
      }
	
}