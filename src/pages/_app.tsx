import { ReactElement, ReactNode, useState } from "react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/context";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
  requiredPermission: string;
} & AppProps["Component"];

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());
  return getLayout(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </QueryClientProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
