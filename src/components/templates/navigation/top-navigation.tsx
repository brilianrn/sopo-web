"use client";

import styles from "@/shared/styles/components/navigation.module.css";
import { cn } from "@/shared/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { TopNavigationProps } from "./navigation";

export const TopNavigation: FC<TopNavigationProps> = ({
  backHref,
  className,
  title,
  titlePosition,
  rightContent,
}) => {
  return (
    <header className={cn(className, styles["top-navigation"])}>
      <div className="flex gap-2 items-center">
        {backHref && (
          <Link href={backHref} replace>
            <ArrowLeft />
          </Link>
        )}
        <h2 className={cn(styles[`title-${titlePosition}`])}>{title}</h2>
      </div>
      {rightContent}
    </header>
  );
};
