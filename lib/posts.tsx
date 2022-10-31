import path from "path";
import fs from "fs"

import matter from "gray-matter";

import { PostData, PostDisplayData, blankPostData } from "../interface/post";
import base32Encode from "base32-encode";

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import rehypeRewrite from 'rehype-rewrite';
import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'


const postsDirectory = (process.cwd() + '/posts');

function getPostDataByFileName(fileName: string): PostData {

      // test if the file is a markdown file, if not return blankPostData
      if (path.extname(fileName) !== ".md") {
            return blankPostData;
      }

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
      const id: string = base32Encode(Uint8Array.from(enc.encode(date.toUTCString() + " " + title)), 'RFC4648');

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
      const content = unified()
            .use(remarkParse)
            .use(remarkMath)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeMathjax)
            .use(rehypeFormat)
            .use(rehypeRewrite, {
                  rewrite: (node) => {
                        if (node.type === 'element' && (node.properties)) {
                              switch (node.tagName) {
                                    case 'a':
                                          break;
                                    case 'img':
                                          node.properties.loading = 'lazy';
                                          break;
                                    case 'h1':
                                          if (node.children[0].type === 'text') {
                                                node.properties.id = node.children[0].value;
                                          }
                                          node.properties.className = 'text-3xl font-bold mt-6 mb-4 leading-snug';
                                          break;
                                    case 'h2':
                                          if (node.children[0].type === 'text') {
                                                node.properties.id = node.children[0].value;
                                          }
                                          node.properties.className = 'text-2xl font-bold mt-5 mb-3 leading-snug';
                                          break;
                                    case 'h3':
                                          if (node.children[0].type === 'text') {
                                                node.properties.id = node.children[0].value;
                                          }
                                          node.properties.className = 'text-xl font-bold mt-4 mb-2 leading-snug';
                                          break;
                                    case 'h4':
                                          if (node.children[0].type === 'text') {
                                                node.properties.id = node.children[0].value;
                                          }
                                          node.properties.className = 'text-lg font-bold mt-3 mb-1 leading-snug';
                                          break;
                                    case 'h5':
                                          if (node.children[0].type === 'text') {
                                                node.properties.id = node.children[0].value;
                                          }
                                          node.properties.className = 'text-lg font-bold mt-2 mb-px leading-snug';
                                          break;
                                    case 'h6':
                                          if (node.children[0].type === 'text') {
                                                node.properties.id = node.children[0].value;
                                          }
                                          node.properties.className = 'text-lg font-bold mt-1 mb-px leading-snug';
                                          break;
                                    case 'blockquote':
                                          node.properties.className = 'border-l-4 border-gray-300 pl-4';
                                          break;
                                    case 'ul':
                                          node.properties.className = 'list-disc ml-5';
                                          break;
                                    case 'ol':
                                          node.properties.className = 'list-decimal ml-5';
                                          break;
                                    case 'li':
                                          node.properties.className = 'my-1';
                                          break;
                                    case 'p':
                                          node.properties.className = 'my-2 text-base';
                                          break;
                                    case 'table':
                                          node.properties.className = 'table-auto';
                                          break;
                                    case 'thead':
                                          node.properties.className = 'bg-gray-100';
                                          break;
                                    case 'tbody':
                                          node.properties.className = 'bg-white';
                                          break;
                                    case 'tr':
                                          node.properties.className = 'border-b border-gray-200';
                                          break;
                                    case 'th':
                                          node.properties.className = 'px-4 py-2';
                                          break;
                                    case 'td':
                                          node.properties.className = 'px-4 py-2';
                                          break;
                                    case 'pre':
                                          node.properties.className = 'bg-gray-100 rounded-md p-1 dark:bg-zinc-700 p-2';
                                          break;
                                    case 'code':
                                          node.properties.className = '';
                                          break;
                                    case 'div':
                                          if (node.properties.className == 'footnotes') {
                                                node.properties.className = 'text-sm';
                                          } else {
                                                node.properties.className = "text-base"
                                          }
                                          break;
                                    case 'hr':
                                          node.properties.className = 'border-gray-300 my-4';
                                          break;
                                    default:
                                          break;
                              }
                        }
                  }
            })
            .use(rehypeStringify, { allowDangerousHtml: true })
            .processSync(matterResult.content)

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
}

export function getSortedPostData(): PostData[] {
      // Get file names under /posts
      const fileNames = fs.readdirSync(postsDirectory);
      const allPostsData = fileNames.map(getPostDataByFileName);

      // filter out blankPostData
      const allPostsDataFiltered = allPostsData.filter((post) => post.id !== blankPostData.id);

      // Sort posts by date
      return allPostsDataFiltered.sort(({ date: a }: PostData, { date: b }: PostData) => {
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
      allPostsData.forEach((postData: PostData) => {
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