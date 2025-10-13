import { ISelectOption } from '@/shared/domain/response.usecase';
import { http, RestAPI } from '@/shared/utils/rest-api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { IFarmerlandController } from '../port/controller.port';
import { FarmerlandRepository } from '../repository';
import { FarmerlandUsecase } from '../usecase';

export enum EFarmerlandQuery {
  PROVINCE = 'PROVINCE',
}

export const useFarmerland = ({
  query,
}: {
  query?: EFarmerlandQuery;
  params?: Record<string, unknown>;
}): IFarmerlandController => {
  const restApi = new RestAPI(http);
  const repository = new FarmerlandRepository(restApi);
  const usecase = new FarmerlandUsecase(repository);

  const provinces = useQuery<ISelectOption[], unknown>({
    queryKey: [EFarmerlandQuery.PROVINCE],
    queryFn: async () => {
      const res = await usecase.provinces();
      if (!res?.error && res?.data?.length) {
        return res?.data?.map((e) => ({
          label: e?.name,
          value: e?.code,
        }));
      }
      toast.error(res?.message);
      return [];
    },
    enabled: query === EFarmerlandQuery.PROVINCE,
  });

  const regencies = useMutation({
    mutationFn: async (provinceCode: string) => {
      const res = await usecase.regencies(provinceCode);
      if (!res?.error && res?.data?.length) {
        return res?.data?.map((e) => ({
          label: e?.name,
          value: e?.code,
        }));
      }
      toast.error(res?.message);
      return [];
    },
  });

  const districts = useMutation({
    mutationFn: async (regencyCode: string) => {
      const res = await usecase.districts(regencyCode);
      if (!res?.error && res?.data?.length) {
        return res?.data?.map((e) => ({
          label: e?.name,
          value: e?.code,
        }));
      }
      toast.error(res?.message);
      return [];
    },
  });

  const villages = useMutation({
    mutationFn: async (districtCode: string) => {
      const res = await usecase.villages(districtCode);
      if (!res?.error && res?.data?.length) {
        return res?.data?.map((e) => ({
          label: e?.name,
          value: e?.code,
        }));
      }
      toast.error(res?.message);
      return [];
    },
  });

  return { provinces, districts, regencies, villages };
};
