'use client';

import { Image } from '@/components/atoms';
import { farmerRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/apps.module.css';
import { cn } from '@/shared/utils';
import { LocateFixed } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { IcPinRed } from '../../../../../public/assets/icons';
import { AppsFarmerItemProps } from '../apps';

export const AppsNearestFarmerItem: FC<AppsFarmerItemProps> = ({
  distance,
  location,
  name,
  photo,
  seoKey,
}) => {
  return (
    <Link
      href={farmerRoute.detail(seoKey || '')}
      className={cn('box-shadow', styles['apps-nearest-farmer-item'])}
    >
      <div className="space-y-1">
        <Image
          src={photo}
          alt={`sopo apps nearest farmer ${name?.toLowerCase()}`}
          width={40}
          height={40}
          errorClassName="!p-0"
          className="rounded object-cover size-10"
        />
      </div>
      <div className="space-y-1 w-[169px]">
        <p className="text-md font-bold truncate text-nowrap line-clamp-1">{name}</p>
        <div className="flex justify-start items-center gap-1">
          <IcPinRed className="size-4" />
          <p className="text-sm text-gray-500 text-nowrap truncate">{location}</p>
        </div>
        <div className="flex justify-start items-center gap-1">
          <LocateFixed className="size-4 text-ocean-default" />
          <p className="text-sm text-gray-500 text-nowrap truncate">{distance}</p>
        </div>
      </div>
    </Link>
  );
};
