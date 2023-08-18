import type { AppProps } from "next/app";
import { Session } from "next-auth";
// import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react";
import NextNprogress from "nextjs-progressbar";
import { Slide, ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig, SWRConfiguration } from "swr";

import { ErrorBoundary } from "@components/ErrorBoundary";
import { BaseLayout } from "@layouts/Base";

import { theme } from "@styles/theme";
import "react-toastify/dist/ReactToastify.min.css";
import "react-credit-cards-2/lib/styles.scss";

type AppPropsWithLayout = AppProps<{
  session: Session | null;
}> & {
  Component: NextPageWithLayout;
};

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: process.env.NODE_ENV !== "development",
  shouldRetryOnError: false,
  refreshInterval:
    process.env.NODE_ENV === "development"
      ? 0
      : 1000 * 60 * 5,
};

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <BaseLayout>
        <ErrorBoundary>{page}</ErrorBoundary>
      </BaseLayout>
    ));

  return (
    <ChakraProvider theme={theme}>
      <NextNprogress
        color="linear-gradient(
						to right,
					#4276b3,
					#2b5d96,
					#285a94,
					#193e69
					)"
        startPosition={0.45}
        stopDelayMs={100}
      />

      <SWRConfig value={swrConfig}>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </SWRConfig>

      <ToastContainer
        position="top-right"
        hideProgressBar
        autoClose={3000}
        transition={Slide}
      />
    </ChakraProvider>
  );
}

export default App;
