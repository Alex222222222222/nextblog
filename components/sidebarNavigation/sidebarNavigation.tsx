import nav from "../../nav.json"

import { getSubcategoryByName } from "../../store/nav"

import { SubCategory } from "./subCategory"
import { SingleCategory } from "./singleCategory"

import { useSidebarContext } from "../../store/sidebarContext"
import { m } from "framer-motion"

import Image from "next/image"

export default function SidebarNavigation(): JSX.Element {

      const { sidebarState, changeSidebarState } =
            useSidebarContext()

      return (
            <m.div
                  animate={{
                        opacity: (sidebarState == "navigations" ? 1 : 0),
                        x: (sidebarState == "navigations" ? 0 : -250),
                  }}
                  transition={{ type: "spring" }}
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
                                    <Image
                                          className="dark:white-filter items-center justify-center"
                                          src="/img/iconLarge.png"
                                          alt="GitHub Logo"
                                          width={180}
                                          height={40}
                                    >
                                    </Image>

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