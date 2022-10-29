import { useSidebarContext } from "../../lib/sidebarContext"

import { PostCategorySidebarData } from "../../interface/post"

import { useEffect, useState } from "react"
import { motion, TargetAndTransition } from "framer-motion"

import SingleCategory from "../sidebarPosts/category"

import Image from "next/image"

export default function SidebarPosts(
): JSX.Element {

      const { sidebarState, changeSidebarState } =
            useSidebarContext()

      const tempPostCategory: PostCategorySidebarData[] = []
      const [data, setData] = useState(tempPostCategory)

      useEffect(() => {
            // if I did not do this, this will kind of constantly refetching for unknown reason
            if (data.length == 0) {
                  fetch('/api/postCategories')
                        .then((res) => res.json())
                        .then((data) => {
                              setData(data)
                        })
            }
      }
      )

      function determineSidebarAnimate(): TargetAndTransition {
            if (sidebarState == "posts") {
                  return {
                        opacity: 1,
                        x: 0,
                  }
            } else {
                  return {
                        opacity: 0,
                        x: -250,
                  }
            }
      }

      return (
            <motion.div
                  initial={false}
                  animate={
                        determineSidebarAnimate()
                  }
                  transition={{ type: "transition" }}
            >
                  <div className="
                  text-gray-600 dark:text-white
                  bg-white dark:bg-zinc-600 
                  h-full rounded-r-3xl shadow-xl
                  shadow-indigo-500/50 dark:shadow-cyan-500/50
                  fixed inset-y-0
                  w-80
                  "
                  >
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
                                                      {data.map(({ name, icon, postsCNT }): JSX.Element => {
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
            </motion.div>
      )
}