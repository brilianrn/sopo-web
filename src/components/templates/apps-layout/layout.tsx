import { cn } from '@/shared/utils';
import { FC } from 'react';
import { LayoutProps } from './apps-layout';

export const Layout: FC<LayoutProps> = ({ children, className, useTopNavigation = true }) => {
  return <div className={cn(useTopNavigation && 'pt-14', className, 'relative')}>{children}</div>;
};
