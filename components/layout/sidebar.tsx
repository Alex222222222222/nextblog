import { Dispatch, SetStateAction, useState } from "react"
import { AiOutlineAlignLeft } from "react-icons/ai"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import Image from "next/image";
import { useContext } from "react";
import MyThemeContext from "../../store/myThemeContext";
import { checkDarkMode } from "../../store/myThemeContext";
import nav from "../../nav.json"

export class SidebarState {
      // posts or navigations
      currentSidebarTab: string;
      setCurrentSidebarTab: Dispatch<SetStateAction<string>>;

      constructor(
            isSideBarOpen: boolean,
            setSideBarOpen: Dispatch<SetStateAction<boolean>>,
            currentSidebarTab: string,
            setCurrentSidebarTab: Dispatch<SetStateAction<string>>,
      ) {
            this.currentSidebarTab = currentSidebarTab
            this.setCurrentSidebarTab = setCurrentSidebarTab
      }
}

function Sidebar(
): JSX.Element {

      const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
            useContext(MyThemeContext);

      function toggleThemeHandler(): void {
            themeCtx.toggleThemeHandler();
      }

      const [currentSidebarTab, setCurrentSidebarTab] = useState("")
      const [darkModeIcon, setDarkModeIcon] = useState(themeCtx.isDarkMode)


      function isRequiredSideBarOpen(name: string): boolean {
            if (currentSidebarTab == name) {
                  return true
            } else {
                  return false
            }
      }

      function setRequiredSideBar(name: string) {
            setCurrentSidebarTab(name)
      }


      return (
            <>
                  <div className="
                  text-black dark:text-white
                  bg-white dark:bg-zinc-600 
                  h-full rounded-r-3xl shadow-xl
                  shadow-indigo-500/50 dark:shadow-cyan-500/50
                  fixed inset-y-0
                  " hidden={!isRequiredSideBarOpen("navigations")}>
                        <div className="ml-16">
                              <div className="mx-2 my-4">
                                    <Image
                                          className="dark:white-filter items-center justify-center"
                                          src="/img/iconLarge.png"
                                          alt="GitHub Logo"
                                          width={180}
                                          height={40}
                                    />

                                    

                              </div>

                        </div>
                  </div>
                  <div className="fixed ml-16" hidden={!isRequiredSideBarOpen("posts")}>
                        efuhiq3aefuh
                  </div>
                  <div className="fixed bg-white dark:bg-zinc-700 h-full w-16 inset-y-0 rounded-r-3xl shadow-xl shadow-indigo-500/50 dark:shadow-cyan-500/50">
                        <div className="flex items-center justify-center  h-16">
                              <Image
                                    className="dark:white-filter items-center justify-center"
                                    src="/favicon.ico"
                                    alt="GitHub Logo"
                                    width={27}
                                    height={27}
                              />
                        </div>
                        <ul className="mt-4">
                              <li>
                                    <button
                                          className="flex items-center justify-center w-12 py-2 rounded-lg mx-2 my-4 h-10
                                          font-bold text-black dark:text-white
                                          bg-gray-50 dark:bg-zinc-600  
                                          shadow-md  shadow-indigo-500/50 dark:shadow-cyan-500/50
                                          hover:bg-violet-500 active:bg-violet-800 focus:bg-violet-500
                                          dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:bg-cyan-500"
                                          onClick={() => {
                                                if (currentSidebarTab == "navigations") {
                                                      setRequiredSideBar("")
                                                } else {
                                                      setRequiredSideBar("navigations")
                                                }
                                          }}
                                          onFocus={() => { }}
                                    >
                                          <AiOutlineAlignLeft />
                                    </button>
                              </li>
                              <li>
                                    <button
                                          className="flex items-center justify-center w-12 py-2 rounded-lg mx-2 my-4 h-10
                                          font-bold text-black dark:text-white
                                          bg-gray-50 dark:bg-zinc-600  
                                          shadow-md  shadow-indigo-500/50 dark:shadow-cyan-500/50
                                          hover:bg-violet-500 active:bg-violet-800 focus:bg-violet-500
                                          dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:bg-cyan-500"
                                          onClick={() => {
                                                if (currentSidebarTab == "posts") {
                                                      setRequiredSideBar("")
                                                } else {
                                                      setRequiredSideBar("posts")
                                                }
                                          }}
                                    >
                                          <AiOutlineAlignLeft />
                                    </button>
                              </li>
                              <li>
                                    <button
                                          type="button"
                                          className="flex items-center justify-center w-12 py-2 rounded-lg mx-2 my-4 h-10
                                          font-bold text-black dark:text-white
                                          bg-gray-50 dark:bg-zinc-600  
                                          shadow-md  shadow-indigo-500/50 dark:shadow-cyan-500/50
                                          hover:bg-violet-500 active:bg-violet-800 focus:bg-violet-500
                                          dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:bg-cyan-500"
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
            </>
      )
}

export default Sidebar

export function SidebarLogo(): JSX.Element {
      return (
            <div></div>
      )
}