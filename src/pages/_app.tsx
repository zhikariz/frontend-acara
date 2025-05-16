import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { onErrorHandler } from "@/libs/axios/responseHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHandler(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHandler,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToasterProvider>
            <AppShell>
              <>
                <Script
                  src={environment.MIDTRANS_SNAP_URL} // e.g. "https://app.midtrans.com/snap/snap.js"
                  data-client-key={environment.MIDTRANS_CLIENT_KEY}
                  strategy="afterInteractive" // ✅ use this instead of lazyOnload
                  onLoad={() => console.log("Midtrans Snap loaded")}
                  onError={(e) => console.error("Failed to load Snap.js", e)}
                />

                <Component {...pageProps} />
              </>
            </AppShell>
          </ToasterProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
