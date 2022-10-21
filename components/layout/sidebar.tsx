import { useState, useContext } from "react"
import Link from "next/link";
import Image from "next/image";
import { m, useAnimationControls } from "framer-motion";

import { BsFillMoonStarsFill, BsFillSunFill, BsGithub } from "react-icons/bs"
import { IoDocumentTextOutline } from "react-icons/io5"
import { GiCompass } from "react-icons/gi"

import MyThemeContext from "../../store/myThemeContext";
import { checkDarkMode } from "../../store/myThemeContext";

import { useSidebarContext } from "../../store/sidebarContext";

import SidebarNavigation from "../sidebarNavigation/sidebarNavigation";
import SidebarPosts from "../sidebarPosts/sidebarPosts";

export default function Sidebar(
): JSX.Element {

      const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
            useContext(MyThemeContext);
      function toggleThemeHandler(): void {
            themeCtx.toggleThemeHandler();
      }

      const { sidebarState, changeSidebarState } =
            useSidebarContext()

      const [darkModeIcon, setDarkModeIcon] = useState(themeCtx.isDarkMode)

      function isRequiredSideBarOpen(name: string): boolean {
            if (sidebarState == name) {
                  return true
            } else {
                  return false
            }
      }

      function setRequiredSideBar(name: string) {
            console.log(name)
            changeSidebarState(name)
            console.log(sidebarState)
      }

      const sidebarAnimationControls = useAnimationControls()

      return (
            <>    
                  <SidebarNavigation />
                  <SidebarPosts />
                  <div className="fixed grid bg-white dark:bg-zinc-700 h-full w-16 inset-y-0 rounded-r-3xl shadow-xl shadow-indigo-500/50 dark:shadow-cyan-500/50">
                        <div>
                              <div className="flex items-center justify-center h-16">
                                    <Link href="/">
                                          <Image
                                                className="dark:white-filter items-center justify-center rounded-full"
                                                src="/img/icon.jpg"
                                                alt="GitHub Logo"
                                                width={48}
                                                height={48}
                                          />
                                    </Link>
                              </div>
                              <ul className="mt-4">
                                    <li key="sidebarNavigations">
                                          <button
                                                className="flex items-center justify-center w-12 py-2 rounded-lg mx-2 my-4 h-10
                                          font-bold text-black dark:text-white
                                          bg-gray-50 dark:bg-zinc-600  
                                          shadow-md  shadow-indigo-500/50 dark:shadow-cyan-500/50
                                          hover:bg-violet-500 active:bg-violet-800 focus:bg-violet-500
                                          dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:bg-cyan-500
                                          text-xl"
                                                onClick={() => {
                                                      if (sidebarState == "navigations") {
                                                            setRequiredSideBar("")
                                                      } else {
                                                            setRequiredSideBar("navigations")
                                                      }
                                                }}
                                          >
                                                <GiCompass />
                                          </button>
                                    </li>
                                    <li key="sidebarPosts">
                                          <button
                                                className="flex items-center justify-center w-12 py-2 rounded-lg mx-2 my-4 h-10
                                          font-bold text-black dark:text-white
                                          bg-gray-50 dark:bg-zinc-600  
                                          shadow-md  shadow-indigo-500/50 dark:shadow-cyan-500/50
                                          hover:bg-violet-500 active:bg-violet-800 focus:bg-violet-500
                                          dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:bg-cyan-500
                                          text-xl"
                                                onClick={() => {
                                                      if (sidebarState == "posts") {
                                                            setRequiredSideBar("")
                                                      } else {
                                                            setRequiredSideBar("posts")
                                                      }
                                                }}
                                          >
                                                <IoDocumentTextOutline />
                                          </button>
                                    </li>
                                    <li key="sidebarTheme">
                                          <button
                                                type="button"
                                                className="flex items-center justify-center w-12 py-2 rounded-lg mx-2 my-4 h-10
                                          font-bold text-black dark:text-white
                                          bg-gray-50 dark:bg-zinc-600  
                                          shadow-md  shadow-indigo-500/50 dark:shadow-cyan-500/50
                                          hover:bg-violet-500 active:bg-violet-800 focus:bg-violet-500
                                          dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:bg-cyan-500
                                          text-xl"
                                                onClick={() => {
                                                      toggleThemeHandler();
                                                      setDarkModeIcon(checkDarkMode());
                                                }}
                                          >
                                                {darkModeIcon ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
                                          </button>
                                    </li>
                              </ul>
                        </div>
                        <div className="grid place-self-end mb-4 text-4xl w-full dark:text-white">
                              <div className="place-self-center">
                                    <span className="hover:cursor-pointer" onClick={
                                          () => {
                                                window.open("https://github.com/Alex222222222222")
                                          }
                                    }>
                                          <BsGithub />
                                    </span>

                              </div>
                        </div>
                  </div>
            </>
      )
}