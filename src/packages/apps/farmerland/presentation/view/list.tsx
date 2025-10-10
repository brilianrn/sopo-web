'use client';

import { EndMessage } from '@/components/atoms';
import { FarmerlandCard } from '@/components/organisms/farmerland';
import { AppsLayout, TopNavigation } from '@/components/templates';
import { farmerlandRoute, Routes } from '@/shared/constants';
import styles from '@/shared/styles/packages/farmerland.module.css';
import { cn } from '@/shared/utils';
import { LandPlot, Plus } from 'lucide-react';
import Link from 'next/link';

export const FarmerlandListView = () => {
  return (
    <AppsLayout useTopNavigation useFooter={false}>
      <TopNavigation title="Lahan Saya" titlePosition="center" backHref={Routes.APPS} />
      <Link
        href={farmerlandRoute.form}
        className={cn(styles['farmerland-add-button'], 'box-shadow')}
      >
        <Plus className="size-8 text-white" />
      </Link>
      <div className="space-y-3 p-4">
        {Array.from({ length: 15 }).map((_, index) => (
          <FarmerlandCard key={index} />
        ))}
        <EndMessage label="lahan" icon={<LandPlot className="size-4" />} />
      </div>
    </AppsLayout>
  );
};
