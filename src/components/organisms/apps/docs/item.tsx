"use client";

import styles from "@/shared/styles/packages/apps.module.css";
import { cn } from "@/shared/utils";
import Link from "next/link";
import { FC } from "react";
import { AppsCategoryItemProps } from "../apps";

export const AppsDocItem: FC<AppsCategoryItemProps> = ({
  icon,
  label,
  seoTitle,
}) => {
  return (
    <Link href={seoTitle}>
      <div
        className={cn(styles["apps-doc-item"], "box-shadow")}
        style={{ backgroundImage: `url(/assets/images/${icon})` }}
      >
        <div className={cn(styles["apps-doc-label"], "bg-shadow h-96")}>
          <p className="font-semibold text-md text-white text-center">
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
};
