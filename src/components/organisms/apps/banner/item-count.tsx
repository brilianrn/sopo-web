"use client";

import styles from "@/shared/styles/packages/apps.module.css";
import { thousandFormat } from "@/shared/utils";
import { FC } from "react";
import { AppsBannerItemCountProps } from "../apps";

export const AppsBannerItemCount: FC<AppsBannerItemCountProps> = ({
  icon,
  label,
  total,
}) => {
  return (
    <div className={styles["apps-top-bar-right-item-count"]}>
      <div className="flex items-center gap-1">
        {typeof icon === "string" ? (
          <div
            className={styles["apps-top-bar-right-item-count-icon"]}
            style={{ backgroundImage: `url(/assets/images/${icon})` }}
          />
        ) : (
          icon
        )}
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p className="text-[32px] font-bold leading-11">
        {thousandFormat(total)}
      </p>
    </div>
  );
};
