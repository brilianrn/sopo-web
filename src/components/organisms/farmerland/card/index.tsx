'use client';

import { Badge, Image } from '@/components/atoms';
import { DialogDrawer } from '@/components/molecules';
import styles from '@/shared/styles/packages/farmerland.module.css';
import { cn } from '@/shared/utils';
import { Calculator, EllipsisVertical, PencilLine, Trash2, TrendingUpDown } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { IcPinRed } from '../../../../../public/assets/icons';

export const FarmerlandCard = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const currentMonth = useMemo(() => moment().locale('id').format('MMMM'), [moment()]);

  const nextMonth = useMemo(() => moment().locale('id').add(1, 'month').format('MMMM'), [moment()]);

  return (
    <React.Fragment>
      <DialogDrawer open={openMenu} setOpen={setOpenMenu}>
        <div className="space-y-0 py-2">
          <Link href={''} className={styles['farmerland-menu-option']}>
            <PencilLine className="size-6" />
            <p className="text-gray-darker">Ubah</p>
          </Link>
          <Link href={''} className={cn(styles['farmerland-menu-option'])}>
            <TrendingUpDown className="size-6" />
            <p className="text-gray-darker">Estimasi Total Panen {nextMonth}</p>
          </Link>
          <Link href={''} className={cn(styles['farmerland-menu-option'])}>
            <Calculator className="size-6" />
            <p className="text-gray-darker">
              Total Panen <span className="font-medium text-primary-default">{currentMonth}</span>
            </p>
          </Link>
          <Link href={''} className={cn(styles['farmerland-menu-option'], '!text-danger-default')}>
            <Trash2 className="size-6" />
            <p>Hapus</p>
          </Link>
        </div>
      </DialogDrawer>
      <div className={cn(styles['farmerland-card'], 'box-shadow')}>
        <Image
          src="/assets/images/placeholder.webp"
          width={100}
          height={100}
          className={styles['farmerland-image']}
          alt="sopo apps farmerland"
        />
        <div className="block w-full relative">
          <div
            onClick={() => setOpenMenu(true)}
            className="absolute top-2 right-2 hover:bg-gray-200 transition-all duration-200 p-1 rounded-md cursor-pointer"
          >
            <EllipsisVertical className="size-4" />
          </div>
          <Badge variant="default">Lahan Baru</Badge>
          <div className="space-y-1">
            <p className="text-xl font-medium">Luasan 100 Ha</p>
            <div className="flex items-center gap-1 w-full text-sm">
              <p>Lebar: 20m</p>|<p>Panjang: 20m</p>
            </div>
            <div className="flex items-center gap-1">
              <IcPinRed className="size-4" />
              <p className="text-sm text-gray-500">Sidoarjo, Jawa Timur</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
