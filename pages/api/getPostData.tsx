import { getAllPostDataIndexedByPostId } from "../../lib/posts"
import { PostData, blankPostData } from "../../interface/post";
import type { NextApiRequest, NextApiResponse } from 'next'

const allPostsDataIndexedByPostId = getAllPostDataIndexedByPostId();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostData>
) {
	const {
            query: { post },
      } = req
      let data = allPostsDataIndexedByPostId.get(post as string);
      if (!(data)) {
            data = blankPostData;
      }

      res.status(200).json(data);
}

