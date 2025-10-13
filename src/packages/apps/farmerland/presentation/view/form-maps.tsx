'use client';

import { Maps } from '@/components/molecules';
import { ILonLat } from '@/components/molecules/maps/maps';
import { AppsLayout, TopNavigation } from '@/components/templates';
import { farmerlandRoute } from '@/shared/constants';
import { store } from '@/shared/context';
import { setFarmerlandFormMaps } from '@/shared/context/actions';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { EMapSet } from '../../domain/request';

export const FarmerLandFormMapsView = () => {
  const { dispatch, state } = useContext(store);

  const { replace } = useRouter();

  const onChoosing = (value: ILonLat) => {
    dispatch(setFarmerlandFormMaps(value));
    replace(`${farmerlandRoute.form}?maps=${EMapSet.SETTLED}`);
  };

  return (
    <AppsLayout useTopNavigation useFooter={false}>
      <TopNavigation title="Lokasi Lahan" titlePosition="center" backHref={farmerlandRoute.form} />
      <Maps
        className="!rounded-none !shadow-none !h-full"
        zoom={15}
        choosenLocation={state?.farmerlandFormMaps}
        setChoosenLocation={onChoosing}
      />
    </AppsLayout>
  );
};
