import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import "@/styles/globals.css";

type NextPageWithLayout = {
    getLayout?: (page: ReactElement) => ReactNode;
} & AppProps["Component"];

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    console.log("getLayout called for");
    return getLayout(<Component {...pageProps} />);
}
