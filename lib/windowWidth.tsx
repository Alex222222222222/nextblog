import { useState, useEffect } from "react";

import { useSidebarContext } from "./sidebarContext";

export const minWidth = 800

export const useWidth = () => {
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

export function mainWindowWidth():number {
	const { sidebarState, changeSidebarState } = useSidebarContext()

	const width = useWidth()
	let windowWidth:number = 0
	if (sidebarState == "init") {
		windowWidth= width - 64
	} else if (sidebarState == "" || width < minWidth) {
		windowWidth= width - 64
	} else {
		windowWidth= width - 320
	}

	return windowWidth
}