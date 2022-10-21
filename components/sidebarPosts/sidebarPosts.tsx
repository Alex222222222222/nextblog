import { useSidebarContext } from "../../store/sidebarContext"

import { PostCategory } from "../../pages/api/postCategories"

import { useEffect, useState } from "react"

import SingleCategory from "../sidebarPosts/category"

import Image from "next/image"

export default function SidebarPosts(
): JSX.Element {

      const { sidebarState, changeSidebarState } =
            useSidebarContext()

      const [postIsLoading, setPostLoading] = useState(false)
      const tempPostCategory: PostCategory[] = []
      const [data, setData] = useState(tempPostCategory)

      useEffect(() => {
            // if I did not do this, this will kind of constantly refetching for unknown reason
            if (data.length == 0) {
                  setPostLoading(true)
                  fetch('/api/postCategories')
                        .then((res) => res.json())
                        .then((data) => {
                              console.log("test")
                              setData(data)
                              setPostLoading(false)
                        })
            }
      }
      )

      return (
            <div className="
                  text-gray-600 dark:text-white
                  bg-white dark:bg-zinc-600 
                  h-full rounded-r-3xl shadow-xl
                  shadow-indigo-500/50 dark:shadow-cyan-500/50
                  fixed inset-y-0
                  w-80
                  " hidden={!(sidebarState == "posts")}>
                  <div className="ml-16">
                        <div className="mx-2 my-4">
                              <>
                                    <Image
                                          className="dark:white-filter items-center justify-center"
                                          src="/img/iconLarge.png"
                                          alt="GitHub Logo"
                                          width={180}
                                          height={40}
                                    >
                                    </Image>

                                    {
                                          ((true)) ? (<ul>
                                                {data.map(({ name,icon,postsCNT }): JSX.Element => {
                                                      return (
                                                            <li key={encodeURI(name)}>
                                                                 <SingleCategory name={name} icon={icon} cnt={postsCNT} />
                                                            </li>
                                                      )
                                                })}
                                          </ul>) : (<></>)
                                    }

                              </>
                        </div>
                  </div>
            </div>
      )
}