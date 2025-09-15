"use client";

import styles from "@/shared/styles/packages/apps.module.css";
import { Bell, Search, User } from "lucide-react";
import { IcPinRed } from "../../../../../public/assets/icons";
import { AppsBannerItemCountProps } from "../apps";
import { AppsBannerItemCount } from "./item-count";

const counts: AppsBannerItemCountProps[] = [
  {
    icon: "farmer.webp",
    label: "Total Petani",
    total: 12983,
  },
  {
    icon: "farmerland.webp",
    label: "Lahan (ha)",
    total: 91820112,
  },
  {
    icon: "sachi-animate.webp",
    label: "Total Panen (Ton)",
    total: 79289,
  },
  {
    icon: "co2.webp",
    label: "Serapan CO² (Ton)",
    total: 1982031,
  },
];

export const AppsBanner = () => {
  return (
    <div className={styles["apps-banner"]}>
      <div className={styles["apps-top-bar"]}>
        <div className={styles["apps-top-bar-left"]}>
          <User className={styles["apps-top-bar-left-avatar"]} />
          <div className="space-y-0 leading-0">
            <b className="font-bold text-sm">John Doe</b>
            <div className="flex items-center gap-1">
              <IcPinRed className="size-3" />
              <p className="text-[10px]">Sidoarjo, Jawa Timur</p>
            </div>
          </div>
        </div>
        <div className={styles["apps-top-bar-right"]}>
          <Search className={styles["apps-top-bar-right-icon"]} />
          <Bell className={styles["apps-top-bar-right-icon"]} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {counts.map((count, index) => (
          <AppsBannerItemCount key={index} {...count} />
        ))}
      </div>
    </div>
  );
};
