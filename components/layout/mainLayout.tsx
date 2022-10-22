import { useSidebarContext } from "../../store/sidebarContext";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

import { m, TargetAndTransition } from "framer-motion";

export default function MainLayout(
  { children }: any,
) {
  const { sidebarState, changeSidebarState } = useSidebarContext()

  const minWidth = 800

  function changMainPageWidthAnimation(): TargetAndTransition {
    if (sidebarState == "init") {
      if (typeof window !== "undefined") {
        return {width: useWidth() - 64}
      } else {
        return {}
      }
    } else if (sidebarState == "" || window.innerWidth < minWidth) {
      return { width: useWidth() - 64 }
    } else {
      return { width: useWidth() - 320, x: 256 }
    }
  }

  const useWidth = () => {
    const [width, setWidth] = useState(0); // default width, detect on server.
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
    return width;
};

  return (
    <>
      <div
        className="flex h-full antialiased text-gray-900 bg-zinc-200 dark:bg-zinc-800 dark:text-light"
      >
        <Sidebar />
        <m.div
          initial={false}
          layoutScroll
          style={{ overflow: "scroll" }}
          transition={{ type: "spring", duration: 0.5 }}
          animate={changMainPageWidthAnimation()}
          onClick={() => {
            if (window.innerWidth < minWidth) {
              changeSidebarState("");
            }
          }}
          className={"flex flex-col min-h-screen items-stretch ml-16 "} >
          <div className="flex-grow  text-black dark:text-zinc-50 w-full">
            <main className="flex-shrink-0 flex items-center justify-center">
              <div className="w-full px-4">
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