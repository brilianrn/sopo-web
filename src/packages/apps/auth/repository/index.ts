import { authPath, rolePath } from '@/shared/constants';
import { ISelectOption } from '@/shared/domain/response.usecase';
import Logger from '@/shared/utils/logger';
import { RestAPI } from '@/shared/utils/rest-api';
import {
  IRequestVerifyOtp,
  TFirstFormRegisterSchema,
  TFormRegisterSchema,
  TLoginSchema,
} from '../domain/request';
import { ILoginFirst, IResponseVerifyOtp } from '../domain/response';
import { IAuthRepository } from '../port/repository.port';

export class AuthRepository implements IAuthRepository {
  private restApi: RestAPI;

  constructor(api: RestAPI) {
    this.restApi = api;
  }

  login = async (body: TLoginSchema) => {
    try {
      const res = await this.restApi.post<IResponseVerifyOtp>({
        endpoint: authPath.login,
        body,
      });

      return res;
    } catch (error) {
      Logger.error(error, { location: 'AuthRepository.login' });
      throw error;
    }
  };

  otpVerify = (data: IRequestVerifyOtp) => {
    try {
      return this.restApi.post<IResponseVerifyOtp>({
        endpoint: authPath.verifyOtp,
        body: data,
      });
    } catch (error) {
      Logger.error(error, { location: 'AuthRepository.otpVerify' });
      throw error;
    }
  };

  register = async (data: TFirstFormRegisterSchema) => {
    try {
      const res = await this.restApi.post<ILoginFirst>({
        endpoint: authPath.register,
        body: data,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'AuthRepository.register' });
      throw error;
    }
  };

  lovRole = async () => {
    try {
      const res = await this.restApi.get<Array<ISelectOption>>({
        endpoint: rolePath.lov,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'AuthRepository.lovRole' });
      throw error;
    }
  };

  registerFull = async ({ token, ...data }: Partial<TFormRegisterSchema>) => {
    try {
      const res = await this.restApi.put<void>({
        endpoint: authPath.registerFullForm(token || ''),
        body: data,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'AuthRepository.registerFull' });
      throw error;
    }
  };
}
