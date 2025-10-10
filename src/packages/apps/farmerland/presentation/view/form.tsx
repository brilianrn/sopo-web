'use client';

import { Badge, Button } from '@/components/atoms';
import { DialogDrawer, InputSelect, InputText, Maps } from '@/components/molecules';
import { ILonLat } from '@/components/molecules/maps/maps';
import { AppsLayout, BottomNavigation, TopNavigation } from '@/components/templates';
import { farmerlandRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/farmerland.module.css';
import { cn, decrypt } from '@/shared/utils';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const badgeList = ['Lahan Baru', 'Pekarangan Rumah', 'Lahan Desa', 'Lahan Barat'];

export const FarmerLandFormView = () => {
  const [label, setLabel] = useState<string>();
  const [openMaps, setOpenMaps] = useState<boolean>(false);
  const [choosenLocation, setChoosenLocation] = useState<ILonLat>();

  const params = useParams();
  const idEncrypt = params?.id?.toString();

  const id = useMemo(() => idEncrypt && decrypt(idEncrypt || ''), [idEncrypt]);

  return (
    <AppsLayout useTopNavigation useFooter={false} className="pb-16">
      <TopNavigation
        title={`${id ? 'Ubah' : 'Tambah'} Data Lahan`}
        titlePosition="center"
        backHref={farmerlandRoute.index}
      />
      <DialogDrawer className="!p-0" open={openMaps} setOpen={setOpenMaps}>
        <Maps
          className="!rounded-none !shadow-none !h-[620px]"
          zoom={15}
          choosenLocation={choosenLocation}
          setChoosenLocation={(v) => {
            setChoosenLocation(v);
            setOpenMaps(false);
          }}
        />
      </DialogDrawer>
      <form className="space-y-4 py-4">
        <div className="space-y-2">
          <div className="px-4">
            <InputText
              useLabelInside
              label="Label Lahan"
              type="text"
              value={label}
              setValue={setLabel}
            />
          </div>
          <div className="flex justify-start items-center flex-nowrap w-full overflow-x-auto gap-1 px-4">
            {badgeList.map((item, index) => (
              <Badge
                onClick={() => setLabel(item)}
                key={index}
                className="text-sm py-2"
                variant={label === item ? 'default' : 'outlinePrimary'}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4 px-4">
          <InputText
            useLabelInside
            label="Panjang Lahan"
            type="number"
            icon="m"
            iconPosition="right"
            iconType="string"
          />
          <InputText
            useLabelInside
            label="Lebar Lahan"
            type="number"
            icon="m"
            iconPosition="right"
            iconType="string"
          />
        </div>
        <div className="px-4 cursor-pointer" onClick={() => setOpenMaps(true)}>
          {!choosenLocation ? (
            <div className={styles['farmerland-form-location']}>
              <div className="flex justify-start items-center gap-2">
                <div className={cn(styles['farmerland-form-location-icon'])} />
                <div className="space-y-0">
                  <h3 className="font-bold">Lokasi Lahan</h3>
                  <p className="text-xs text-gray-400">
                    Penjemputan hasil panen menjadi lebih mudah
                  </p>
                </div>
              </div>
              <ArrowRight className="min-h-5 min-w-5 text-gray-500" />
            </div>
          ) : (
            <Maps className="!h-48" choosenLocation={choosenLocation} />
          )}
        </div>
        <div className="px-4 space-y-4">
          <InputSelect
            options={[{ label: 'Indonesia', value: 'IDN' }]}
            useLabelInside
            label="Negara"
          />
          <InputSelect
            options={[{ label: 'Indonesia', value: 'IDN' }]}
            useLabelInside
            label="Provinsi"
          />
          <InputSelect
            options={[{ label: 'Indonesia', value: 'IDN' }]}
            useLabelInside
            label="Kota/Kabupaten"
          />
          <InputSelect
            options={[{ label: 'Indonesia', value: 'IDN' }]}
            useLabelInside
            label="Kecamatan"
          />
          <InputSelect
            options={[{ label: 'Indonesia', value: 'IDN' }]}
            useLabelInside
            label="Kelurahan"
          />
          <InputSelect
            options={[{ label: 'Indonesia', value: 'IDN' }]}
            useLabelInside
            label="Kode Pos"
          />
        </div>
      </form>
      <BottomNavigation className="flex justify-center gap-2 items-center">
        <Button type="button" className="w-full" variant="dangerOutline">
          Batalkan
        </Button>
        <Button type="button" className="w-full">
          Simpan
        </Button>
      </BottomNavigation>
    </AppsLayout>
  );
};
