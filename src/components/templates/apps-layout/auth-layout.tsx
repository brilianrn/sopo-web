'use client';

import { Routes } from '@/shared/constants';
import { useAuth } from '@/shared/hooks';
import styles from '@/shared/styles/components/apss-layout.module.css';
import { cn } from '@/shared/utils';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { SplashScreen } from '../splash-screen';

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { replace } = useRouter();

  const { isLoggedIn, isLoadingAuth } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      replace(Routes.APPS);
    }
  }, [isLoggedIn, replace]);

  if (isLoadingAuth) return <SplashScreen />;

  return (
    <div className={cn(styles['apps-layout'])}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
