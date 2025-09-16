"use client";

import { Image } from "@/components/atoms";
import styles from "@/shared/styles/packages/apps.module.css";
import { cn } from "@/shared/utils";
import { Grid3X3, Key } from "lucide-react";
import { FC } from "react";
import { IcPinRed } from "../../../../../public/assets/icons";
import { AppsFarmerlandItemProps } from "../apps";

export const AppsNearestFarmerlandItem: FC<AppsFarmerlandItemProps> = ({
  distance,
  location,
  ownerName,
  photo,
  wide,
}) => {
  return (
    <div className={cn("box-shadow", styles["apps-nearest-farmerland-item"])}>
      <Image
        src={photo}
        alt={`sopo apps nearest farmerland ${location?.toLowerCase()}`}
        width={208}
        height={187}
        errorClassName="!p-0"
        className={styles["apps-nearest-farmerland-item-image"]}
      />
      <div className="px-4 py-2 space-y-1">
        <div className="flex items-center gap-2">
          <Grid3X3 className="size-4 items-center text-primary-default" />
          <h3 className="text-sm">{wide} (ha)</h3>
        </div>
        <div className="flex items-center gap-2">
          <Key className="size-4 text-warning-darker/70" />
          <h3 className="text-sm font-bold">{ownerName}</h3>
        </div>
        <div className="flex items-center gap-2">
          <IcPinRed className="size-4 items-center text-gray-darker" />
          <h3 className="text-sm truncate">{location}</h3>
        </div>
      </div>
    </div>
  );
};
