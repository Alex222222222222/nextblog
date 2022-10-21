import { useSidebarContext } from "../../store/sidebarContext";
import Header from "./header";
import Sidebar from "./sidebar";
import { checkDarkMode } from "../../store/myThemeContext";

import { m } from "framer-motion";

export default function MainLayout(
  { children }: any,
) {
  const { sidebarState, changeSidebarState } = useSidebarContext()

  const minWidth = 800

  return (
    <>
      <div
      className="flex h-full antialiased text-gray-900 bg-zinc-200 dark:bg-zinc-800 dark:text-light"
      >
        <Sidebar />
        <m.div
          onClick={() => {
            if (window.innerWidth < minWidth) {
              changeSidebarState("");
            }
          }}
          className={"flex flex-col min-h-screen items-stretch w-full " + ((sidebarState == "" || sidebarState == "init") ? "ml-16" : ((window.innerWidth < minWidth) ? "ml-16" : "ml-80"))}>
          <div className="flex-grow  text-black dark:text-zinc-50 w-full">
            <main className="flex-shrink-0 flex items-center justify-center">
              <div className="w-full mx-4">
                <Header />
                {children}
              </div>
            </main>
          </div>
        </m.div>
      </div>
    </>
  );
}