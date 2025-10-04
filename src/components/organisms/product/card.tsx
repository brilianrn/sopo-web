'use client';

import { Image } from '@/components/atoms';
import { productDetailRoute } from '@/shared/constants';
import styles from '@/shared/styles/components/product.module.css';
import { cn, formatRupiah } from '@/shared/utils';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { IcPinRed } from '../../../../public/assets/icons';
import { ProductCardProps } from './product';

export const ProductCard: FC<ProductCardProps> = ({
  image,
  location,
  name,
  price,
  rating,
  seoTitle,
  sold,
}) => {
  return (
    <Link href={productDetailRoute(seoTitle)} className={cn('box-shadow', styles['product-card'])}>
      <Image
        src={image}
        alt={`sopo product ${name?.toLowerCase()}`}
        width={195}
        height={195}
        errorClassName="!p-0"
        className={styles['product-image']}
      />
      <div className="space-y-0 p-2">
        <h2 className={styles['product-name']}>{name}</h2>
        <p className="font-bold text-lg truncate">{formatRupiah(price)}</p>
        <div className="block text-sm text-gray-500 space-y-1">
          {sold ? <p>{sold} terjual</p> : undefined}
          {rating ? (
            <div className="flex gap-1 items-center">
              <Star className="size-3 fill-warning-default text-warning-default" />
              <p className="text-nowrap truncate">Rating penjual {rating}/5</p>
            </div>
          ) : undefined}
          <div className="flex justify-start items-center gap-1">
            <IcPinRed className="size-3" />
            <p className="text-nowrap truncate">{location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
