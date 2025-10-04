import { authRoute, Routes } from '@/shared/constants';
import { ISelectOption } from '@/shared/domain/response.usecase';
import { http, RestAPI } from '@/shared/utils/rest-api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { IAuthController } from '../port/controller.port';
import { AuthRepository } from '../repository';
import { AuthUseCase } from '../usecase';

export enum EAuthQuery {
  LOV_ROLE = 'LOV_ROLE',
}

export const useAuthController = (query?: EAuthQuery): IAuthController => {
  const restApi = new RestAPI(http);
  const repository = new AuthRepository(restApi);
  const usecase = new AuthUseCase(repository);

  const { push: navigate, replace } = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const login = useMutation({
    mutationFn: usecase.login,
    onSuccess: async ({ message, error, data }) => {
      if (error) {
        return toast.error(error?.message || message);
      }
      toast.success(message);
      return navigate(
        `${authRoute.loginOtp(data?.token || '')}${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`,
      );
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const otpVerify = useMutation({
    mutationFn: usecase.otpVerify,
    onSuccess: async ({ message, error }) => {
      if (error) {
        return toast.error(error?.message || message);
      }
      toast.success(message);
      return navigate(callbackUrl || Routes.APPS);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const register = useMutation({
    mutationFn: usecase.register,
    onSuccess: async ({ message, error, data }) => {
      if (error) {
        return toast.error(error?.message || message);
      }
      toast.success(message);
      return navigate(authRoute.registerOtp(data?.token || ''));
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const lovRole = useQuery<ISelectOption[], unknown>({
    queryKey: [EAuthQuery.LOV_ROLE],
    queryFn: async () => {
      const res = await usecase.lovRole();
      if (!res?.error && res?.data?.length) {
        return res?.data;
      }
      toast.error(res?.message);
      return [];
    },
    enabled: query === EAuthQuery.LOV_ROLE,
  });

  const registerFull = useMutation({
    mutationFn: usecase.registerFull,
    onSuccess: async ({ message, error }) => {
      if (error) {
        return toast.error(error?.message || message);
      }
      toast.success(message);
      return replace(authRoute.login);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { login, otpVerify, register, lovRole, registerFull };
};
