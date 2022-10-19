import Sidebar from "./sidebar";

export default function MainLayout({ children }: any) {
  
  return (
    <>
      <div className="flex h-screen antialiased text-gray-900 bg-zinc-200 dark:bg-zinc-800 dark:text-light">
        <Sidebar />
        <div className="flex flex-col min-h-screen items-stretch ml-16 w-full">
          <div className="flex-grow  text-black dark:text-zinc-50 w-full">
            <main className="flex-shrink-0 flex items-center justify-center">{children}</main>
          </div>
          <div className="flex-shrink-0">
          </div>
        </div>
      </div>
    </>
  );
}