import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../components/layout/mainLayout";
import { MyThemeContextProvider } from "../lib/myThemeContext";
import { SidebarContextWrapper } from "../lib/sidebarContext";

import { LazyMotion, domAnimation } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<LazyMotion features={domAnimation}>
			<MyThemeContextProvider>
				<SidebarContextWrapper>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</SidebarContextWrapper>
			</MyThemeContextProvider>
		</LazyMotion>
	);
}

export default MyApp;