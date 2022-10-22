import { createContext, ReactElement, useEffect, useState, useContext } from "react";

import { motion, useAnimationControls } from "framer-motion";

const MyThemeContext = createContext({
	isDarkTheme: true,
	toggleThemeHandler: () => { },
});

interface ThemePropsInterface {
	children?: JSX.Element | JSX.Element[];
}

export function MyThemeContextProvider(
	props: ThemePropsInterface
): ReactElement {

	const spring = {
		type: 'spring',
		stiffness: 700,
		damping: 30,
	}

	const [isDarkTheme, setIsDarkTheme] = useState(true);
	useEffect(() => initialThemeHandler());

	const themeAnimationControls = useAnimationControls()

	function isLocalStorageEmpty(): boolean {
		return !localStorage.getItem("isDarkTheme");
	}

	function initialThemeHandler(): void {
		if (isLocalStorageEmpty()) {
			localStorage.setItem("isDarkTheme", `true`);
			document!.querySelector("body")!.classList.add("dark");
			setIsDarkTheme(true);
		} else {
			const isDarkTheme: boolean = JSON.parse(
				localStorage.getItem("isDarkTheme")!
			);
			isDarkTheme && document!.querySelector("body")!.classList.add("dark");
			setIsDarkTheme(() => {
				return isDarkTheme;
			});
		}
	}

	function toggleThemeHandler(): void {
		const isDarkTheme: boolean = JSON.parse(
			localStorage.getItem("isDarkTheme")!
		);
		if (isDarkTheme) {
			themeAnimationControls.start({ opacity: [1, 0, 1], backgroundColor: ["black", "gray", "white"] })
		} else {
			themeAnimationControls.start({ opacity: [1, 0, 1], backgroundColor: ["white", "gray", "black"] })
		}
		setIsDarkTheme(!isDarkTheme);
		toggleDarkClassToBody();
		setValueToLocalStorage();
	}

	function toggleDarkClassToBody(): void {
		document!.querySelector("body")!.classList.toggle("dark");
	}

	function setValueToLocalStorage(): void {
		localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
	}

	return (
		<MyThemeContext.Provider value={{ isDarkTheme: true, toggleThemeHandler }}>
			<motion.div
				layout
				animate={themeAnimationControls}
				transition={{ type: "spring", duration: 0.3 }}
			>
				{props.children}
			</motion.div>
		</MyThemeContext.Provider>
	);
}

export default MyThemeContext;

export function useThemeContext(): boolean {
	return useContext(MyThemeContext).isDarkTheme
}

export function checkDarkMode(): boolean {
	return JSON.parse(
		localStorage.getItem("isDarkTheme")!
	);
}