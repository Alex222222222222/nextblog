import { useSidebarContext } from "../../lib/sidebarContext";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

import { m, TargetAndTransition, useAnimationControls } from "framer-motion";

import { checkDarkMode } from "../../lib/myThemeContext";

const useWidth = () => {
	const [width, setWidth] = useState(0); // default width, detect on server.
	const handleResize = () => setWidth(window.innerWidth);
	useEffect(() => {
		if (width == 0 && typeof window !== "undefined") {
			setWidth(window.innerWidth)
		}
	})
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);
	return width;
};

export default function MainLayout(
	{ children }: any,
) {
	const { sidebarState, changeSidebarState } = useSidebarContext()

	const minWidth = 800

	function changMainPageWidthAnimation(): TargetAndTransition {
		const width = useWidth()
		if (sidebarState == "init") {
			return { width: width - 64 }
		} else if (sidebarState == "" || width < minWidth) {
			return { width: width - 64 }
		} else {
			return { width: width - 320, x: 256 }
		}
	}

	useEffect(() => {
		if (sidebarState == "init") {
			changeSidebarState("")
		}
	})

	const changePageAnimationControl= useAnimationControls()

	if (typeof window !== "undefined"){
		useEffect(()=>{
			if (checkDarkMode()) {
				changePageAnimationControl.start({ opacity: [1, 0, 1], color: ["black", "gray", "black"] })
			} else {
				changePageAnimationControl.start({ opacity: [1, 0, 1], color: ["white", "gray", "white"] })
			}
		},[window.location.href,window.location.pathname])
	}

	return (
		<>
			<m.div
				animate={changePageAnimationControl}
				className="flex h-full antialiased text-gray-900 bg-zinc-200 dark:bg-zinc-800 dark:text-light"
			>
				<Sidebar />
				<m.div
					initial={false}
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
			</m.div>
		</>
	);
}