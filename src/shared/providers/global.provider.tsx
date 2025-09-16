"use client";

import { SplashScreen } from "@/components/templates";
import { queryClient } from "@/shared/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, Suspense, useState } from "react";
// import { SessionProvider } from './session.provider'

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [queryClientState] = useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientState}>
      {process.env.NEXT_PUBLIC_DEV_TOOLS === "true" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <Suspense fallback={<SplashScreen />}>
        {/* <SessionProvider>{children}</SessionProvider> */}
        {children}
      </Suspense>
    </QueryClientProvider>
  );
};
