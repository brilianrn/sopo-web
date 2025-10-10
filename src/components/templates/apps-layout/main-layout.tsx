'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useRef } from 'react';

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const direction = useRef(1);

  if (prevPath.current && prevPath.current !== pathname) {
    const prevDepth = prevPath.current.split('/').length;
    const currDepth = pathname.split('/').length;
    direction.current = currDepth > prevDepth ? 1 : -1;
  }
  prevPath.current = pathname;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: 100 * direction.current, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100 * direction.current, opacity: 0 }}
        transition={{
          duration: 0.08,
          ease: [0.32, 0.72, 0, 1],
        }}
        className="min-h-screen overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
