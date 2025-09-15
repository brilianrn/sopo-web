"use client";

import styles from "@/shared/styles/components/spinner.module.css";
import { cn } from "@/shared/utils";
import { FC } from "react";

export const Spinner: FC<{ className?: string }> = ({ className }) => (
  <span className={cn(className, styles.loader)} />
);
