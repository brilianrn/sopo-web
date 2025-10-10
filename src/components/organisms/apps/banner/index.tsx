'use client';

import { Button } from '@/components/atoms';
import { authRoute } from '@/shared/constants';
import { useAuth } from '@/shared/hooks';
import styles from '@/shared/styles/packages/apps.module.css';
import { Bell, Power, Search, User } from 'lucide-react';
import { IcPinRed } from '../../../../../public/assets/icons';
import { AppsBannerItemCountProps } from '../apps';
import { AppsBannerItemCount } from './item-count';

const counts: AppsBannerItemCountProps[] = [
  {
    icon: 'farmer.webp',
    label: 'Total Petani',
    total: 12983,
  },
  {
    icon: 'farmerland.webp',
    label: 'Lahan (ha)',
    total: 1200,
  },
  {
    icon: 'sachi-animate.webp',
    label: 'Total Panen (Ton)',
    total: 850,
  },
  {
    icon: 'carbon.webp',
    label: 'Total Karbon (Ton)',
    total: 73829,
  },
];

export const AppsBanner = () => {
  const { dataUser } = useAuth();

  return (
    <div className={styles['apps-banner']}>
      <div className={styles['apps-top-bar']}>
        {!dataUser?.token ? (
          <Button href={authRoute.login} className={styles['apps-top-bar-login']}>
            <Power />
            Masuk
          </Button>
        ) : (
          <div className={styles['apps-top-bar-left']}>
            <User className={styles['apps-top-bar-left-avatar']} />
            <div className="space-y-0 leading-0">
              <b className="font-bold text-sm">{dataUser?.name || '-'}</b>
              <div className="flex items-center gap-1">
                <IcPinRed className="size-3" />
                <p className="text-[10px]">Sidoarjo, Jawa Timur</p>
              </div>
            </div>
          </div>
        )}
        <div className={styles['apps-top-bar-right']}>
          <Search className={styles['apps-top-bar-right-icon']} />
          <Bell className={styles['apps-top-bar-right-icon']} />
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
