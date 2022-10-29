import { getAllPostIdsFromSortedPostData } from "../../lib/posts"
import { PostData, blankPostData } from "../../interface/post"
import { useState, useEffect } from "react"
import AuthorCardInPost from "../../components/widgets/authorCardInPost"
import Link from "next/link"
import markdownStyles from "../../styles/markdown-styles.module.css"

export async function getStaticProps({ params }: {
      params: {
            post: string
      }
}) {
      return {
            props: {
                  post: params.post
            }
      }
}

export async function getStaticPaths() {
      const ids = getAllPostIdsFromSortedPostData()
      return {
            paths: ids.map((id) => {
                  return {
                        params: {
                              post: encodeURI(id)
                        }
                  }
            }),
            fallback: false,
      }
}

export default function Post({ post }: {
      post: string
}): JSX.Element {

      // get post data from api
      const [postData, setPostData] = useState<PostData>(blankPostData)
      const [reqState, setReqState] = useState<boolean>(false)
      useEffect(() => {
            if (!reqState) {
                  fetch("/api/getPostData?post=" + post)
                        .then((res) => res.json())
                        .then((data) => {
                              setPostData(data)
                              setReqState(true)
                        })
            }
      })

      const dateData = new Date(postData.date).toUTCString()

      return (<>
            <div
                  className="pt-2 max-w-[64em] mx-auto place-content-center flex"
            >
                  <div className="mx-4 divide-y divide-gray-300 dark:divide-zinc-600">
                        <div>
                              {((postData.category) && (postData.category.length > 0)) ? (<div
                                    className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap my-1"
                              >
                                    {postData.category.map((category: string) => {
                                          return (
                                                <Link href={"/post/category/" + encodeURI(category)}>
                                                      <div
                                                            className="flex mr-2"
                                                            key={"postsCategoryPagePostCategories:" + encodeURI(postData.id) + ":" + encodeURI(category)}
                                                      >

                                                            <div className="c-triangle-left-sm text-emerald-400 dark:text-emerald-800" />
                                                            <div className="grid justify-center h-5 items-center bg-emerald-400 dark:bg-emerald-800">
                                                                  <div className="mx-2">
                                                                        {category}
                                                                  </div>
                                                            </div>

                                                      </div>
                                                </Link>
                                          )
                                    })}
                              </div>) : (<></>)}
                              {((postData.tag) && (postData.tag.length > 0)) ? (<div
                                    className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap mt-1"
                              >
                                    {postData.tag.map((tag: string) => {
                                          return (
                                                <Link href={"/post/category/" + encodeURI(tag)}>
                                                      <div
                                                            className="flex mr-2"
                                                            key={"postsCategoryPagePostTags:" + encodeURI(postData.id) + ":" + encodeURI(tag)}
                                                      >

                                                            <div className="c-triangle-left-sm text-orange-300 dark:text-amber-800" />
                                                            <div className="grid justify-center h-5 items-center bg-orange-300 dark:bg-amber-800">
                                                                  <div className="mx-2">
                                                                        {tag}
                                                                  </div>
                                                            </div>

                                                      </div>
                                                </Link>
                                          )
                                    })}
                              </div>) : (<></>)}
                              <div
                                    className="place-content-center max-h-32 flex justify-center items-center overflow-hidden rounded-lg mr-3"
                              >
                              </div>

                              <div
                                    className="text-2xl"
                              >
                                    <span>
                                          {postData.title}
                                    </span>
                              </div>
                              <div
                                    className="text-xs text-gray-500 dark:text-gray-400"
                              >
                                    <span>
                                          {dateData}
                                    </span>
                              </div>

                        </div>
                        <div
                              className="my-1"
                        >
                              <AuthorCardInPost name={postData.author} />
                        </div>
                        <div
                              className="text-sm text-gray-500 dark:text-gray-400 my-1"
                        >
                              {postData.excerpt}
                        </div>
                        <div
                              className="text-sm text-gray-500 dark:text-gray-400"
                        >
                              <div
                                    className={markdownStyles['markdown']}
                                    dangerouslySetInnerHTML={{ __html: postData.content }}
                              />
                        </div>

                  </div>

            </div>

      </>)
}