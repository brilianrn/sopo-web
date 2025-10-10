'use client';

import styles from '@/shared/styles/components/navigation.module.css';
import { cn } from '@/shared/utils';
import { FC, ReactNode } from 'react';

export const BottomNavigation: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <footer className={cn(className, styles['bottom-navigation'], 'box-shadow')}>{children}</footer>
  );
};
