"use client";

import styles from "@/shared/styles/components/apss-layout.module.css";
import { cn } from "@/shared/utils";
import {
  Banknote,
  Bolt,
  LayoutGrid,
  MessageCircleMore,
  Plus,
} from "lucide-react";
import { FC, ReactNode, useState } from "react";

export const AppsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

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

  const cls = visible ? "visible-navbar" : "hidden-navbar";

  return (
    <div className={cn(styles["apps-layout"])}>
      <div className={styles.inner} onScroll={handleScroll}>
        {children}
        <footer className={cn(styles.footer)}>
          <div className={cn(styles["bottom-bar"], styles[cls])}>
            <div className="bg-primary-darker/50 absolute left-1/2 -translate-x-1/2 h-full w-full z-[1] rounded-2xl box-shadow" />
            <div className="rounded-xl box-shadow p-4 flex justify-start items-center gap-1 z-[2] bg-white/90">
              <LayoutGrid className="size-6 text-primary-default fill-primary-default/70" />
              <p className="text-md text-primary-600">Utama</p>
            </div>
            <div className="rounded-xl box-shadow p-4 flex justify-start items-center gap-1 z-[2] bg-white/90">
              <Banknote className="size-6 text-black/60" />
            </div>
            <div className="rounded-xl box-shadow p-4 flex justify-start items-center gap-1 z-[2] bg-white/90">
              <Plus className="size-6 text-black/60" />
            </div>
            <div className="rounded-xl box-shadow p-4 flex justify-start items-center gap-1 z-[2] bg-white/90">
              <MessageCircleMore className="size-6 text-black/60" />
            </div>
            <div className="rounded-xl box-shadow p-4 flex justify-start items-center gap-1 z-[2] bg-white/90">
              <Bolt className="size-6 text-black/60" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
