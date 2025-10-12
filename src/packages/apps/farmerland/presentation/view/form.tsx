'use client';

import { Badge, Button, Image } from '@/components/atoms';
import { InputText, InputTextarea, Maps } from '@/components/molecules';
import { AppsLayout, BottomNavigation, TopNavigation } from '@/components/templates';
import { farmerlandRoute } from '@/shared/constants';
import { store } from '@/shared/context';
import styles from '@/shared/styles/packages/farmerland.module.css';
import { cn, decrypt } from '@/shared/utils';
import { ArrowRight, FolderUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useMemo, useRef, useState } from 'react';

const badgeList = ['Lahan Baru', 'Pekarangan Rumah', 'Lahan Desa', 'Lahan Barat'];

export const FarmerLandFormView = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { state } = useContext(store);

  const [label, setLabel] = useState<string>();

  const { push: navigate } = useRouter();
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
      <div
        className="relative h-[180px] w-full bg-gray-200/30 group cursor-pointer"
        onClick={() => fileInputRef?.current?.click()}
      >
        <input
          ref={fileInputRef}
          className="invisible h-[180px] w-full z-[2] absolute top-0 left-0"
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,.heic,.heif"
        />
        <FolderUp
          className={cn(
            'group-hover:fill-gray-50/80 group-hover:text-gray-400/70 text-gray-200/50 fill-transparent',
            styles['farmerland-form-icon-upload'],
          )}
        />
        <Image
          src="https://img.freepik.com/free-photo/aerial-shot-farmland-clear-sky-eifel-region-germany_181624-26567.jpg?t=st=1758033248~exp=1758036848~hmac=efae6e438a0f5b5348b5dba06ac0930b78dd522a035e4bc0218ab9c4d1be58e7&w=2000"
          alt="sopo image - farmerland"
          height={100}
          width={400}
          className="object-cover w-full h-[180px]"
        />
      </div>
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
        <div className="px-4 cursor-pointer" onClick={() => navigate(farmerlandRoute.formMaps)}>
          {!state?.farmerlandFormMaps ? (
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
            <Maps className="!h-48" choosenLocation={state?.farmerlandFormMaps} />
          )}
        </div>
        {/* TODO: form maps
        {state?.farmerlandFormMaps && (
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
        )} */}
        <div className="px-4">
          <InputTextarea label="Detail Lokasi" useLabelInside />
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
