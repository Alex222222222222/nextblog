import Header from "./header";
import Sidebar from "./sidebar";

export default function MainLayout({ children }: any) {
  return (
    <>
      <div className="flex antialiased text-gray-900 bg-zinc-200 dark:bg-zinc-800 dark:text-light">
        <Sidebar />
        <div className="flex flex-col min-h-screen items-stretch ml-16 w-full">
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