'use client';

import { Button, Image } from '@/components/atoms';
import { farmerlandRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/apps.module.css';
import { cn } from '@/shared/utils';
import { Grid3X3, HeartHandshake, Key } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { IcPinRed } from '../../../../../public/assets/icons';
import { AppsFarmerlandItemProps } from '../apps';

export const AppsNearestFarmerlandItem: FC<AppsFarmerlandItemProps> = ({
  location,
  ownerName,
  photo,
  wide,
  seoKey,
}) => {
  return (
    <Link
      href={farmerlandRoute.detail(seoKey || '')}
      className={cn('box-shadow z-0', styles['apps-nearest-farmerland-item'])}
    >
      <Image
        src={photo}
        alt={`sopo apps nearest farmerland ${location?.toLowerCase()}`}
        width={208}
        height={187}
        errorClassName="!p-0"
        className={styles['apps-nearest-farmerland-item-image']}
      />
      <div className="px-2 py-2 space-y-1">
        <div className="flex items-center gap-2">
          <Grid3X3 className="size-4 items-center text-primary-default" />
          <h3 className="text-md font-bold">{wide} ha</h3>
        </div>
        <div className="flex items-center gap-2">
          <Key className="size-4 text-warning-darker/70" />
          <h3 className="text-sm text-gray-500">{ownerName}</h3>
        </div>
        <div className="flex items-center gap-2">
          <IcPinRed className="size-4 items-center text-gray-darker" />
          <h3 className="text-sm text-gray-500 truncate">{location}</h3>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="mt-1 z-[1]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <HeartHandshake className="size-4" />
          Ajukan Kerjasama
        </Button>
      </div>
    </Link>
  );
};
