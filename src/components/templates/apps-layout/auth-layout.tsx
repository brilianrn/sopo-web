"use client";

import styles from "@/shared/styles/components/apss-layout.module.css";
import { cn } from "@/shared/utils";
import { FC, ReactNode } from "react";

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={cn(styles["apps-layout"])}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
