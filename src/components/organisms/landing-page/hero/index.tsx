'use client';

import { Button } from '@/components/atoms';
import { authRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/landing-page.module.css';
import { Leaf } from 'lucide-react';
import { FC } from 'react';
import { LandingPageSectionProps } from '../landing-page';

export const LandingPageHero: FC<LandingPageSectionProps> = ({ id }) => {
  return (
    <section id={id} className={styles.dashboard}>
      <div className={styles['dashboard-blur']}>
        <div className="inline-flex justify-center items-center gap-2 px-4 py-2 accent-primary-default/30 backdrop-blur-sm rounded-full border border-primary-default/30 mb-8 md:mt-0 mt-10">
          <Leaf className="size-4 text-primary-default" />
          <span className="text-sm font-medium text-primary-foreground">
            Ekosistem Pertanian Digital
          </span>
        </div>
        <h1 className="text-4xl font-extrabold sm:text-6xl">
          Feture <span className="text-primary-default">Farming</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg sm:text-xl text-green-100">
          <span className="block text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            Kami Sedang Meng-Omega-kan Indonesia,
          </span>
          <span className="block">
            dengan cara membangun
            <b className="text-yellow-300"> Ekosistem Omega Nabati </b>
            melalui platform digital yang
            <b className="font-semibold text-primary-light"> terintegrasi</b>.
          </span>
        </p>
        <div className="mt-16 flex md:flex-row flex-col gap-4">
          <Button
            target="_blank"
            href={authRoute.register}
            variant="warning"
            size="2xl"
            className="text-warning-darker font-semibold hover:text-warning-200 transition-all duration-200"
          >
            Gabung Sekarang
          </Button>
          <Button
            href="#ecosystem"
            variant="warningOutline"
            size="2xl"
            className="text-white font-semibold border-white hover:text-warning-darker transition-all duration-200"
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
        <div className="flex justify-center md:gap-8 gap-1 pt-12 md:w-3xl w-full items-start">
          <div className="space-y-2 w-full">
            <div className="text-4xl font-bold text-primary-foreground">100%</div>
            <div className="text-sm text-primary-foreground/80">Transparansi</div>
          </div>
          <div className="space-y-2 w-full">
            <div className="text-4xl font-bold text-primary-foreground">4</div>
            <div className="text-sm text-primary-foreground/80">Stakeholder Terintegrasi</div>
          </div>
          <div className="space-y-2 w-full">
            <div className="text-4xl font-bold text-primary-foreground">1</div>
            <div className="text-sm text-primary-foreground/80">Platform Terpadu</div>
          </div>
        </div>
      </div>
    </section>
  );
};
