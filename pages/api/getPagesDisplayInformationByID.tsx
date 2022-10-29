import { PostDisplayData } from "../../interface/post";
import { getAllPostDisplayDataFromSortedData } from "../../lib/posts";

import { NextApiRequest, NextApiResponse } from "next";

const allPostDisplayDataFromSortedData = getAllPostDisplayDataFromSortedData()

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostDisplayData>
) {
      const { id } = req.query;
      if (allPostDisplayDataFromSortedData.has(id as string)) {
            res.status(200).json(allPostDisplayDataFromSortedData.get(id as string) as PostDisplayData);
      } else {
            res.status(500).json({} as PostDisplayData);
      }
	
}