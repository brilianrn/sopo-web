'use client';

import { Badge, Button, Image } from '@/components/atoms';
import { InputSelect, InputText, InputTextarea, Maps } from '@/components/molecules';
import { AppsLayout, BottomNavigation, TopNavigation } from '@/components/templates';
import { farmerlandRoute } from '@/shared/constants';
import { store } from '@/shared/context';
import { setFarmerlandForm } from '@/shared/context/actions';
import styles from '@/shared/styles/packages/farmerland.module.css';
import { cn, decrypt } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, FolderUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { TFormFarmerland } from '../../domain/request';
import { FormFarmerlandSchema } from '../../dto';
import { EFarmerlandQuery, useFarmerland } from '../controller';

const badgeList = ['Lahan Baru', 'Pekarangan Rumah', 'Lahan Desa', 'Lahan Barat'];

export const FarmerLandFormView = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { state, dispatch } = useContext(store);

  const [file, setFile] = useState<File>();

  const {
    register,
    getValues,
    resetField,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFormFarmerland>({
    mode: 'onChange',
    resolver: zodResolver(FormFarmerlandSchema),
  });

  const { push: navigate } = useRouter();
  const params = useParams();
  const idEncrypt = params?.id?.toString();

  const id = useMemo(() => idEncrypt && decrypt(idEncrypt || ''), [idEncrypt]);

  const {
    provinces: { data: provinces },
    regencies: { data: regencies, mutate: getRegencies },
    districts: { data: districts, mutate: getDistricts },
    villages: { data: villages, mutate: getVillages },
  } = useFarmerland({ query: EFarmerlandQuery.PROVINCE });

  useEffect(() => {
    if (watch('provinceCode')) {
      getRegencies(watch('provinceCode'));
      resetField('regencyCode');
      resetField('districtCode');
      resetField('villageCode');
    }
  }, [watch('provinceCode')]);

  useEffect(() => {
    if (watch('regencyCode')) {
      getDistricts(watch('regencyCode'));
      resetField('districtCode');
      resetField('villageCode');
    }
  }, [watch('regencyCode')]);

  useEffect(() => {
    if (watch('districtCode')) {
      getVillages(watch('districtCode'));
      resetField('villageCode');
    }
  }, [watch('districtCode')]);

  useEffect(() => {
    if (state?.farmerlandFormMaps) {
      setValue('lng', Number(state?.farmerlandFormMaps?.lon));
      setValue('lat', Number(state?.farmerlandFormMaps?.lat));
    }
  }, [state?.farmerlandFormMaps]);

  console.log(state, ' state?.farmerlandForm >>>>>', watch('provinceCode'));

  // useEffect(() => {
  //   if (state?.farmerlandForm) {
  //     reset(state.farmerlandForm, { keepDirty: true, keepTouched: true });
  //   }
  // }, [state?.farmerlandForm, reset]);

  useEffect(() => {
    const attributes: (keyof TFormFarmerland)[] = [
      'label',
      'width',
      'length',
      'lng',
      'lat',
      'provinceCode',
      'regencyCode',
      'districtCode',
      'villageCode',
      'locationDetail',
      'image',
    ];

    attributes.forEach((attr) => {
      if (state?.farmerlandForm?.[attr]) {
        setValue(attr, state.farmerlandForm[attr]);
      }
    });
  }, [state?.farmerlandForm, setValue]);

  const onNavigateMaps = () => {
    const payload = getValues();
    flushSync(() => dispatch(setFarmerlandForm(payload)));
    navigate(farmerlandRoute.formMaps);
  };

  return (
    <AppsLayout useTopNavigation useFooter={false} className="pb-16">
      <form>
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
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <FolderUp
            className={cn(
              'group-hover:fill-gray-50/80 group-hover:text-gray-400/70 text-gray-200/50 fill-transparent',
              styles['farmerland-form-icon-upload'],
            )}
          />
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="selected file"
              height={100}
              width={400}
              className="object-cover w-full h-[180px]"
              errorClassName="!h-full !w-full"
            />
          )}
        </div>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="px-4">
              <InputText
                useLabelInside
                label="Label Lahan"
                type="text"
                register={register}
                value={watch('label')}
                name="label"
                errorMessage={errors?.label?.message}
              />
            </div>
            <div className="flex justify-start items-center flex-nowrap w-full overflow-x-auto gap-1 px-4">
              {badgeList.map((item, index) => (
                <Badge
                  onClick={() =>
                    setValue('label', item, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                  key={index}
                  className="text-sm py-2"
                  variant={watch('label') === item ? 'default' : 'outlinePrimary'}
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
              value={(watch('length') ?? '')?.toString()}
              iconType="string"
              register={register}
              name="length"
              errorMessage={errors?.length?.message}
            />
            <InputText
              useLabelInside
              label="Lebar Lahan"
              type="number"
              icon="m"
              iconPosition="right"
              value={(watch('width') ?? '')?.toString()}
              iconType="string"
              register={register}
              name="width"
              errorMessage={errors?.width?.message}
            />
          </div>
          <div className="px-4 cursor-pointer" onClick={onNavigateMaps}>
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
          {state?.farmerlandFormMaps && (
            <div className="px-4 space-y-4">
              {/* <InputSelect options={[]} useLabelInside label="Negara" /> */}
              <InputSelect
                value={watch('provinceCode')}
                useLabelInside
                label="Provinsi"
                name="provinceCode"
                register={register}
                options={provinces || []}
                errorMessage={errors?.provinceCode?.message}
              />
              <InputSelect
                value={watch('regencyCode')}
                useLabelInside
                disabled={!watch('provinceCode')}
                label="Kota/Kabupaten"
                name="regencyCode"
                register={register}
                options={regencies || []}
                errorMessage={errors?.regencyCode?.message}
              />
              <InputSelect
                value={watch('districtCode')}
                useLabelInside
                disabled={!watch('regencyCode')}
                label="Kecamatan"
                name="districtCode"
                register={register}
                options={districts || []}
                errorMessage={errors?.districtCode?.message}
              />
              <InputSelect
                value={watch('villageCode')}
                useLabelInside
                disabled={!watch('districtCode')}
                label="Kelurahan"
                name="villageCode"
                register={register}
                options={villages || []}
                errorMessage={errors?.villageCode?.message}
              />
              {/* <InputSelect options={[]} useLabelInside label="Kode Pos" /> */}
              <InputTextarea
                label="Detail Lokasi"
                useLabelInside
                className="min-h-32"
                register={register}
                name="locationDetail"
                errorMessage={errors?.locationDetail?.message}
              />
            </div>
          )}
        </div>
        <BottomNavigation className="flex justify-center gap-2 items-center">
          <Button type="reset" className="w-full" variant="dangerOutline">
            Batalkan
          </Button>
          <Button type="submit" className="w-full" disabled={!isValid} isSubmitting={isSubmitting}>
            Simpan
          </Button>
        </BottomNavigation>
      </form>
    </AppsLayout>
  );
};
