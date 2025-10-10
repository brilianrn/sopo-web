'use client';

import { categoryRoute } from '@/shared/constants';
import { useAuth } from '@/shared/hooks';
import { useMemo } from 'react';
import { AppsCategoryItemProps } from '../apps';
import { AppsCategoryItem } from './item';

const data: AppsCategoryItemProps[] = [
  {
    icon: 'cat-oil.png',
    label: 'Minyak',
    seoTitle: 'minyak',
  },
  {
    icon: 'cat-supplement.png',
    label: 'Suplemen',
    seoTitle: 'suplemen',
  },
  {
    icon: 'cat-beauty.png',
    label: 'Kecantikan',
    seoTitle: 'kecantikan',
  },
  {
    icon: 'cat-others.png',
    label: 'Lainnya',
    seoTitle: categoryRoute.index,
  },
];

export const AppsCategory = () => {
  const { dataUser } = useAuth();

  const categories = useMemo(() => {
    if (dataUser?.role === process.env.FARMER_CODE) {
      return [
        {
          icon: 'cat-education.png',
          label: 'Pelatihan',
          seoTitle: 'pelatihan',
        },
        {
          icon: 'cat-seed.png',
          label: 'Benih',
          seoTitle: 'benih',
        },
        {
          icon: 'cat-tools.png',
          label: 'Sarana',
          seoTitle: 'sarana',
        },
        {
          icon: 'cat-environment.png',
          label: 'Biochar',
          seoTitle: 'biochar',
        },
        ...data,
      ];
    }
    return [
      {
        icon: 'star-peanut.webp',
        label: 'Kacang Bintang',
        seoTitle: 'kacang-bintang',
      },
      {
        icon: 'oc.webp',
        label: 'Kacang Coklat',
        seoTitle: 'kacang-coklat',
      },
      {
        icon: 'white-kernel.webp',
        label: 'Kacang Putih',
        seoTitle: 'kacang-putih',
      },
      {
        icon: 'cat-tools.png',
        label: 'Sarana',
        seoTitle: 'sarana',
      },
      ...data,
    ];
  }, [dataUser?.role]);

  return (
    <div className="grid grid-cols-4 gap-4 w-full px-4">
      {categories?.map((item, index) => (
        <AppsCategoryItem key={index} {...item} />
      ))}
    </div>
  );
};
