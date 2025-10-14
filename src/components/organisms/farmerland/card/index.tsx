'use client';

import { Badge, Image } from '@/components/atoms';
import { DialogDrawer } from '@/components/molecules';
import styles from '@/shared/styles/packages/farmerland.module.css';
import { cn } from '@/shared/utils';
import {
  Calculator,
  EllipsisVertical,
  PencilLine,
  RulerDimensionLine,
  Trash2,
  TrendingUpDown,
} from 'lucide-react';
import moment from 'moment';
import 'moment/locale/id';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { IcPinRed } from '../../../../../public/assets/icons';

export const FarmerlandCard = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // eslint-disable-next-line
  const currentMonth = useMemo(() => moment().locale('id').format('MMMM'), [moment()]);
  // eslint-disable-next-line
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
          src="https://img.freepik.com/free-photo/aerial-shot-farmland-clear-sky-eifel-region-germany_181624-26567.jpg?t=st=1758033248~exp=1758036848~hmac=efae6e438a0f5b5348b5dba06ac0930b78dd522a035e4bc0218ab9c4d1be58e7&w=2000"
          width={100}
          height={200}
          className={styles['farmerland-image']}
          alt="sopo apps farmerland"
        />
        <div className="block w-full relative py-2 pr-2">
          <div
            onClick={() => setOpenMenu(true)}
            className="absolute top-2 right-1 hover:bg-gray-200 transition-all duration-200 p-1 rounded-md cursor-pointer"
          >
            <EllipsisVertical className="size-4" />
          </div>
          <Badge variant="default">Lahan Baru</Badge>
          <div className="space-y-1 mt-1">
            <p className="text-lg font-semibold">
              <span className="font-normal">Panen ({moment().locale('id').format('MMM')}):</span>{' '}
              4,39 Ton
            </p>
            <p className="text-sm">
              Panen ({moment().add(1, 'month').locale('id').format('MMM')}): 4,39 Ton
            </p>
            <div className="flex items-center gap-2">
              <div className="size-4 xy-center">
                <RulerDimensionLine className="min-h-4 min-w-4 text-primary-default" />
              </div>
              <p className="text-sm text-gray-500">0,83 ha</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 xy-center">
                <IcPinRed className="min-h-4 min-w-4 h-4 w-4" />
              </div>
              <p className="text-sm text-gray-500">Sidoarjo, Jawa Timur</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
