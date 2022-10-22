import path from "path";
import fs from "fs"

import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html"

const postsDirectory = (process.cwd()+'/posts');

export type PostData = {
      id: string;
      title: string;
      date:Date;
      author: string;
      category: string[];
      tag: string[];
      hidden: boolean;
      excerpt: string;
      ogImage: string;
      content: string;
}

export function getSortedPostData():PostData[] {
      // Get file names under /posts
      const fileNames = fs.readdirSync(postsDirectory);
      const allPostsData = fileNames.map((fileName: string): PostData => {
            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // get title
            const title: string = matterResult.data["title"];

            // get date
            const date: Date = new Date(matterResult.data["date"]);

            // combine the file data and title to get the id
            const id: string = encodeURI(date.toUTCString + " " + title);

            // get author
            const author: string = matterResult.data["author"];

            // get category
            const categoryAll: string = matterResult.data["category"];
            const category: string[] = ((categoryAll)?(categoryAll.split(",")):[]);

            // get tag
            const tagAll: string = matterResult.data["tag"];
            const tag: string[] = ((tagAll)?(tagAll.split(",")):[]);

            // get hidden
            const hiddenS: string = matterResult.data["hidden"];
            const hidden: boolean = ((hiddenS)?hiddenS.toLowerCase() == 'true':false);

            // get excerpt
            const excerpt: string = matterResult.data['excerpt'];

            // get ogImage
            const ogImage: string = matterResult.data['ogImage'];

            // get html content
            const content = remark().use(html).processSync(matterResult.content);

            // Combine the data with the id
            return {
                  id,
                  title,
                  date,
                  author,
                  category,
                  tag,
                  hidden,
                  excerpt,
                  ogImage,
                  content: content.toString(),
            };
      });

      // Sort posts by date
      return allPostsData.sort(({ date: a }:PostData, { date: b }:PostData) => {
            if (a < b) {
                  return 1;
            } else if (a > b) {
                  return -1;
            } else {
                  return 0;
            }
      });
}

export default function preBuiltGetPostData() {
      const allPostData = getSortedPostData
      
}