import nav from "../../nav.json"

import { getSubcategoryByName } from "../../store/nav"

import { useSidebarContext } from "../../store/sidebarContext"

export default function SidebarPosts(): JSX.Element {

      const { sidebarState, changeSidebarState } =
            useSidebarContext()

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
                              <img
                                    className="dark:white-filter items-center justify-center"
                                    src="/img/iconLarge.png"
                                    alt="GitHub Logo"
                                    width={180}
                                    height={40}
                              >
                              </img>

                        </div>
                  </div>
            </div>
      )
}