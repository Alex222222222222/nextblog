import nav from "../../nav.json"

import { getSubcategoryByName } from "../../lib/nav"

import { SubCategory } from "./subCategory"
import { SingleCategory } from "./singleCategory"

import { useSidebarContext } from "../../lib/sidebarContext"
import { m, TargetAndTransition } from "framer-motion"

import Link from "next/link"
import { BiCategory } from "react-icons/bi"

export default function SidebarNavigation(): JSX.Element {

      const { sidebarState, changeSidebarState } =
            useSidebarContext()

      function determineSidebarAnimate(): TargetAndTransition {
            if (sidebarState == "navigations") {
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
            <m.div
                  animate={determineSidebarAnimate()}
                  transition={{ type: "transition" }}
                  initial={false}
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
                                    <div className="text-3xl mb-2 ml-2 ">
                                          Navigations
                                    </div>

                                    <hr className="py-px"></hr>

                                    <Link href={"/nav/category"}>
                                          <div className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
                                                <span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
                                                      <BiCategory />
                                                      <span className="px-2">All Categories</span>
                                                </span>
                                          </div>
                                    </Link>
                                    <Link href={"/nav/tag"}>
                                          <div className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
                                                <span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
                                                      <BiCategory />
                                                      <span className="px-2">All Tags</span>
                                                </span>
                                          </div>
                                    </Link>

                                    <hr className="py-px"></hr>

                                    <ul>
                                          {nav.categories.map(({ name, description, fatherCategory, icon, hidden }) => {
                                                if (fatherCategory == "") {
                                                      const subCategory = getSubcategoryByName(name)
                                                      if (subCategory.length > 0) {
                                                            return (
                                                                  <li key={"categorySidebar:" + encodeURI(name)}>
                                                                        <SubCategory name={name} description={description} icon={icon} hidden={hidden} />
                                                                  </li>
                                                            )
                                                      } else {
                                                            return (
                                                                  <li key={"categorySidebar:" + encodeURI(name)}>
                                                                        <SingleCategory name={name} description={description} icon={icon} hidden={hidden} />
                                                                  </li>
                                                            )
                                                      }
                                                } else {
                                                      return ""
                                                }

                                          })}
                                    </ul>

                              </div>
                        </div>
                  </div>
            </m.div>
      )
}