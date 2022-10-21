import { useSidebarContext } from "../../store/sidebarContext";
import Header from "./header";
import Sidebar from "./sidebar";

export default function MainLayout(
  { children }: any,
) {
  const { sidebarState, changeSidebarState } = useSidebarContext()

  return (
    <>
      <div className="flex h-full antialiased text-gray-900 bg-zinc-200 dark:bg-zinc-800 dark:text-light">
        <Sidebar />
        <div
          onClick={() => {
            if (window.innerWidth < 1024) {
              changeSidebarState("");
            }
          }}
          className={"flex flex-col min-h-screen items-stretch w-full " + ((sidebarState == "") ? "ml-16" : ((window.innerWidth < 1024) ? "ml-16" : "ml-80"))}>
          <div className="flex-grow  text-black dark:text-zinc-50 w-full">
            <main className="flex-shrink-0 flex items-center justify-center">
              <div className="w-full mx-4">
                <Header />
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}