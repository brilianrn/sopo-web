'use client';

import { farmerlandRoute } from '@/shared/constants';
import { useAuth, useScreenSize } from '@/shared/hooks';
import styles from '@/shared/styles/components/apss-layout.module.css';
import { cn } from '@/shared/utils';
import { Banknote, Bolt, LayoutGrid, MessageCircleMore, Plus } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';

export const AppsLayout: FC<{
  children: ReactNode;
  useFooter?: boolean;
  useTopNavigation?: boolean;
  className?: string;
}> = ({ children, useFooter = true, useTopNavigation, className }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const { width } = useScreenSize();
  const {
    dataUser: { role },
  } = useAuth();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const currentScroll = target.scrollTop;

    if (currentScroll > lastScrollTop) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setLastScrollTop(currentScroll);
  };

  const cls = visible ? 'visible-navbar' : 'hidden-navbar';

  return (
    <div className={cn(styles['apps-layout'])}>
      <div
        className={cn(useTopNavigation && 'pt-14', styles.inner, className)}
        onScroll={handleScroll}
      >
        {/* <InstallPwaModal /> */}
        {children}
        {useFooter && (
          <footer className={cn(styles.footer)}>
            <div className={cn(styles['bottom-bar'], styles[cls])}>
              <div className="bg-primary-darker/50 absolute left-1/2 -translate-x-1/2 h-full w-full z-[1] rounded-2xl box-shadow" />
              <div
                className={cn(
                  width <= 360 ? 'p-3.5' : 'p-4',
                  'rounded-xl box-shadow flex justify-start items-center gap-1 z-[2] bg-white/90',
                )}
              >
                <LayoutGrid className="size-6 text-primary-default fill-primary-default/70" />
                <p className="text-md text-primary-600">Utama</p>
              </div>
              <div
                className={cn(
                  width <= 360 ? 'p-3.5' : 'p-4',
                  'rounded-xl box-shadow flex justify-start items-center gap-1 z-[2] bg-white/90',
                )}
              >
                <Banknote className="size-6 text-black/60" />
              </div>
              {role === process.env.FARMER_CODE && (
                <Link
                  href={farmerlandRoute.index}
                  className={cn(
                    width <= 360 ? 'p-3.5' : 'p-4',
                    'rounded-xl box-shadow flex justify-start items-center gap-1 z-[2] bg-white/90',
                  )}
                >
                  <Plus className="size-6 text-black/60" />
                </Link>
              )}
              <div
                className={cn(
                  width <= 360 ? 'p-3.5' : 'p-4',
                  'rounded-xl box-shadow flex justify-start items-center gap-1 z-[2] bg-white/90',
                )}
              >
                <MessageCircleMore className="size-6 text-black/60" />
              </div>
              <div
                className={cn(
                  width <= 360 ? 'p-3.5' : 'p-4',
                  'rounded-xl box-shadow flex justify-start items-center gap-1 z-[2] bg-white/90',
                )}
              >
                <Bolt className="size-6 text-black/60" />
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
