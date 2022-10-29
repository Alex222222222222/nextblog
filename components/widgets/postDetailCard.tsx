import { PostDisplayData } from "../../interface/post"

import { useState, useEffect } from "react"

import Link from "next/link"

export default function PostDetailCard({ id }: {
      id: string
}): JSX.Element {

      // get PostDisplayData by id from api getPagesDisplayInformationByID
      const [postDisplayData, setPostDisplayData] = useState<PostDisplayData>({} as PostDisplayData)
      const [isPostDisplayDataLoaded, setIsPostDisplayDataLoaded] = useState<boolean>(false)
      useEffect(() => {
            if (!isPostDisplayDataLoaded) {
                  fetch("/api/getPagesDisplayInformationByID?id=" + id)
                        .then((res) => res.json())
                        .then((data) => {
                              setPostDisplayData(data)
                              setIsPostDisplayDataLoaded(true)
                        })
            }
      })

      return (
            <>
                  <div
                        className="my-2 p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-lg shadow-indigo-500/50 dark:shadow-cyan-500/50"
                  >
                        <div
                              className="flex"
                        >
                              {((postDisplayData.ogImage) && (postDisplayData.ogImage !== "")) ? (<div
                                    className="w-1/2 place-content-center max-h-64 flex justify-center items-center overflow-hidden rounded-lg mr-3"
                              >
                                    <img
                                          className="object-cover w-full h-full"
                                          src={postDisplayData.ogImage}
                                          alt="avatar"
                                    />
                              </div>) : (<></>)}
                              <div
                                    className="w-full divide-y divide-gray-200 dark:divide-zinc-600"
                              >
                                    <div
                                          className="mb-1"
                                    >
                                          <div
                                                className="text-lg"
                                          >
                                                <Link
                                                      href={"/posts/" + id}
                                                >
                                                      <span>
                                                            {postDisplayData.title}
                                                      </span>
                                                </Link>
                                          </div>
                                          <div
                                                className="text-sm text-gray-700 dark:text-gray-200"
                                          >
                                                By: <Link
                                                      href={"/post/author/" + encodeURI(postDisplayData.author)}
                                                >
                                                      <span>
                                                            {postDisplayData.author}
                                                      </span>
                                                </Link>
                                          </div>
                                          <div
                                                className="text-xs text-gray-500 dark:text-gray-400"
                                          >
                                                {postDisplayData.date}
                                          </div>
                                    </div>
                                    <div className="pt-1">
                                          <div
                                                className="text-sm text-gray-500 dark:text-gray-400"
                                          >
                                                {postDisplayData.excerpt}
                                          </div>
                                          {((postDisplayData.category) && (postDisplayData.category.length > 0)) ? (<div
                                                className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap my-1"
                                          >
                                                {postDisplayData.category.map((category: string) => {
                                                      return (
                                                            <Link href={"/post/category/" + encodeURI(category)}>
                                                                  <div
                                                                        className="flex mr-2"
                                                                        key={"postsCategoryPagePostCategories:" + encodeURI(postDisplayData.id) + ":" + encodeURI(category)}
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
                                          {((postDisplayData.tag) && (postDisplayData.tag.length > 0)) ? (<div
                                                className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap my-1"
                                          >
                                                {postDisplayData.tag.map((tag: string) => {
                                                      return (
                                                            <Link href={"/post/category/" + encodeURI(tag)}>
                                                                  <div
                                                                        className="flex mr-2"
                                                                        key={"postsCategoryPagePostTags:" + encodeURI(postDisplayData.id) + ":" + encodeURI(tag)}
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
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}