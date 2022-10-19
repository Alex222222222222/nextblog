import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../components/layout/mainLayout";
import { MyThemeContextProvider } from "../store/myThemeContext";
import { SidebarContextWrapper } from "../store/sidebarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyThemeContextProvider>
      <SidebarContextWrapper>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SidebarContextWrapper>
    </MyThemeContextProvider>
  );
}

export default MyApp;