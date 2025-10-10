'use client';

import { Toaster } from '@/components/atoms';
import { MainLayout, SplashScreen } from '@/components/templates';
import { queryClient } from '@/shared/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, Suspense, useState } from 'react';
import { ToastClassnames } from 'sonner';
import { useAuth } from '../hooks';

const classNames: ToastClassnames = {
  success: '!bg-primary-default',
  error: '!bg-danger-default',
  warning: '!bg-warning-default',
  info: '!bg-info-default',
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [queryClientState] = useState(() => queryClient);

  const { isLoadingAuth } = useAuth();

  return (
    <MainLayout>
      <QueryClientProvider client={queryClientState}>
        <Toaster
          richColors
          position="bottom-center"
          theme="light"
          toastOptions={{
            className: '!rounded-full !px-5 !py-4 !shadow-md !text-white',
            classNames,
          }}
        />
        {isLoadingAuth ? (
          <SplashScreen />
        ) : (
          <Suspense fallback={<SplashScreen />}>{children}</Suspense>
        )}
        {process.env.NEXT_PUBLIC_DEV_TOOLS === 'true' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </MainLayout>
  );
};
