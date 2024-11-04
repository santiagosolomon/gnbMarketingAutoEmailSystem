import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@preact/signals-react/auto";
import NextNProgress from "nextjs-progressbar";

import Layout from "./layout";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isRootRoute = router.pathname === "/";
  const queryClient = new QueryClient();

  return (
    <div>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {isRootRoute ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <NextNProgress
                color="rgb(244 63 94 / 0.9)"
                showSpinner="false"
                options={{ showSpinner: false }}
              />
              <Component {...pageProps} />{" "}
            </Layout>
          )}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </NextUIProvider>
    </div>
  );
}
