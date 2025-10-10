'use client';

import { categoryRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/apps.module.css';
import Link from 'next/link';
import { FC } from 'react';
import { AppsCategoryItemProps } from '../apps';

export const AppsCategoryItem: FC<AppsCategoryItemProps> = ({ icon, label, seoTitle }) => {
  return (
    <Link href={categoryRoute.detail(seoTitle)}>
      <div className={styles['apps-category-item']}>
        {typeof icon === 'string' ? (
          <div
            className={styles['apps-category-icon']}
            style={{ backgroundImage: `url(/assets/images/${icon})` }}
          />
        ) : (
          icon
        )}
        <p className="text-sm text-center text-wrap">{label}</p>
      </div>
    </Link>
  );
};
