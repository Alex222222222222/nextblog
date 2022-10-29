import path from "path";
import fs from "fs"

import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html"

import { PostData, PostDisplayData, PostCategorySidebarData } from "../interface/post";
import base32Encode from "base32-encode";

const postsDirectory = (process.cwd() + '/posts');

export function getSortedPostData(): PostData[] {
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
            const enc = new TextEncoder()
            const id: string = base32Encode(Uint8Array.from(enc.encode(date.toUTCString() + " " + title)),'RFC4648');

            // get author
            const author: string = matterResult.data["author"];

            // get category
            const categoryAll: string = matterResult.data["category"];
            const category: string[] = ((categoryAll) ? (categoryAll.split(",")) : []);

            // get tag
            const tagAll: string = matterResult.data["tag"];
            const tag: string[] = ((tagAll) ? (tagAll.split(",")) : []);

            // get hidden
            const hiddenS: string = matterResult.data["hidden"];
            const hidden: boolean = ((hiddenS) ? hiddenS.toLowerCase() == 'true' : false);

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
      return allPostsData.sort(({ date: a }: PostData, { date: b }: PostData) => {
            if (a < b) {
                  return 1;
            } else if (a > b) {
                  return -1;
            } else {
                  return 0;
            }
      });
}

export function getAllPostDataIndexedByPostId(): Map<string, PostData> {
      const allPostsData = getSortedPostData();
      const allPostsDataIndexedByPostId = new Map<string, PostData>();
      allPostsData.forEach((post: PostData) => {
            allPostsDataIndexedByPostId.set(post.id, post);
      });
      return allPostsDataIndexedByPostId;
}

export function getAllPostIdsFromSortedPostData(): string[] {
      const allPostsData = getSortedPostData();
      return allPostsData.map(({ id }: PostData) => {
            return id
      });
}

export function getAllPostDisplayDataFromSortedData(): Map<string, PostDisplayData> {
      const allPostsData = getSortedPostData();
      const allPostDisplayData = new Map<string, PostDisplayData>();
      console.log(allPostsData.length);
      allPostsData.forEach((postData: PostData) => {
            console.log(postData.id);
            allPostDisplayData.set(postData.id, {
                  id: postData.id,
                  title: postData.title,
                  date: postData.date.toUTCString(),
                  author: postData.author,
                  category: postData.category,
                  tag: postData.tag,
                  hidden: postData.hidden,
                  excerpt: postData.excerpt,
                  ogImage: postData.ogImage,
            })
      })
      return allPostDisplayData;

}

export function getAllCategoryOfPosts(): string[] {
      const allPostsData = getSortedPostData();
      const allCategoryOfPosts = new Set<string>();
      allPostsData.forEach((postData: PostData) => {
            postData.category.forEach((category: string) => {
                  allCategoryOfPosts.add(category);
            })
      })
      return Array.from(allCategoryOfPosts);
}

export function getAllTagOfPosts(): string[] {
      const allPostsData = getSortedPostData();
      const allTagOfPosts = new Set<string>();
      allPostsData.forEach((postData: PostData) => {
            postData.tag.forEach((tag: string) => {
                  allTagOfPosts.add(tag);
            })
      })
      return Array.from(allTagOfPosts);
}

export function getAllPostIDOfCategory(category: string): string[] {
      const allPostsData = getSortedPostData();
      const allPostIDOfCategory = new Set<string>();
      allPostsData.forEach((postData: PostData) => {
            if (postData.category.includes(category)) {
                  allPostIDOfCategory.add(postData.id);
            }
      })
      return Array.from(allPostIDOfCategory);
}

export function getAllPostIDOfTag(tag: string): string[] {
      const allPostsData = getSortedPostData();
      const allPostIDOfTag = new Set<string>();
      allPostsData.forEach((postData: PostData) => {
            if (postData.tag.includes(tag)) {
                  allPostIDOfTag.add(postData.id);
            }
      })
      return Array.from(allPostIDOfTag);
}

export function getAllPostDisplayDataOfCategory(category: string): PostDisplayData[] {
      const allPostIDOfCategory = getAllPostIDOfCategory(category);
      const allPostDisplayData = getAllPostDisplayDataFromSortedData();
      const allPostDisplayDataOfCategory = new Map<string, PostDisplayData>();
      allPostIDOfCategory.forEach((postID: string) => {
            allPostDisplayDataOfCategory.set(postID, (allPostDisplayData.get(postID)) as PostDisplayData);
      })
      return Array.from(allPostDisplayDataOfCategory.values());
}