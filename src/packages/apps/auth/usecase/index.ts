import { validationMessage } from '@/shared/constants';
import { ISelectOption, IUsecaseResponse } from '@/shared/domain/response.usecase';
import { encrypt, isEmail, isPhone } from '@/shared/utils';
import Logger from '@/shared/utils/logger';
import {
  ELoginType,
  IRequestVerifyOtp,
  TFirstFormRegisterSchema,
  TFormRegisterSchema,
  TLoginSchema,
} from '../domain/request';
import { ILoginFirst, IResponseVerifyOtp } from '../domain/response';
import { IAuthRepository } from '../port/repository.port';
import { IAuthUsecase } from '../port/usecase.port';

export class AuthUseCase implements IAuthUsecase {
  private repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }

  login = async (data: TLoginSchema): Promise<IUsecaseResponse<IResponseVerifyOtp>> => {
    try {
      let type = data.method;
      if (!type) {
        const validPhone = isPhone(data.input);
        type = validPhone ? ELoginType.WHATSAPP : ELoginType.EMAIL;
      }
      const encryptedData: TLoginSchema = {
        token: data?.token || '',
        method: type,
        input: encrypt(data.input),
        password: data?.token && !data?.password?.length ? '' : encrypt(data.password),
      };
      const result = await this.repository.login(encryptedData);
      if (result?.data?.token) {
        return result;
      }
      return {
        error: new Error(result?.message),
        message: validationMessage().failedLogin(
          data.method === ELoginType.EMAIL ? 'Email' : 'Nomor telepon',
        ),
      };
    } catch (err) {
      Logger.error(err, { location: 'AuthUseCase.login' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage().failedLogin(
          data.method === ELoginType.EMAIL ? 'Email' : 'Nomor telepon',
        ),
      };
    }
  };

  otpVerify = async (data: IRequestVerifyOtp): Promise<IUsecaseResponse<IResponseVerifyOtp>> => {
    try {
      const result = await this.repository.otpVerify(data);
      if (result?.code !== 200) {
        return { error: new Error(result?.message), message: result?.message };
      }
      return {
        data: result?.data,
        message: result?.message || validationMessage('verifikasi OTP')[200](),
      };
    } catch (err) {
      Logger.error(err, { location: 'AuthUseCase.otpVerify' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage('OTP').invalidField(),
      };
    }
  };

  register = async (data: TFirstFormRegisterSchema): Promise<IUsecaseResponse<ILoginFirst>> => {
    try {
      const input = encrypt(data.input);
      const method = (isEmail(data.input) ? ELoginType.EMAIL : ELoginType.WHATSAPP) || data.method;
      const result = await this.repository.register({ ...data, input, method });
      if (result?.data?.token) {
        return result;
      }
      return {
        error: new Error(result?.message),
        message: validationMessage()[400](),
      };
    } catch (err) {
      Logger.error(err, { location: 'AuthUseCase.register' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[400](),
      };
    }
  };

  lovRole = async (): Promise<IUsecaseResponse<Array<ISelectOption>>> => {
    try {
      const result = await this.repository.lovRole();
      if (result?.code === 200) {
        return { data: result?.data, message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: validationMessage('Tipe pengguna')[404](),
      };
    } catch (err) {
      Logger.error(err, { location: 'AuthUseCase.lovRole' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[400](),
      };
    }
  };

  registerFull = async ({
    input,
    password,
    token,
    name,
    roleCode,
  }: TFormRegisterSchema): Promise<IUsecaseResponse<void>> => {
    try {
      const result = await this.repository.registerFull({
        name,
        token,
        roleCode,
        input: encrypt(input),
        password: encrypt(password),
      });
      if (result?.code === 200) {
        return { message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: result?.message,
      };
    } catch (err) {
      Logger.error(err, { location: 'AuthUseCase.registerFull' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[400](),
      };
    }
  };

  socialAuth = async (token: string) => {
    try {
      const result = await this.repository.socialAuth(token);
      if (result?.code === 200) {
        return { data: result?.data, message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: result?.message,
      };
    } catch (err) {
      Logger.error(err, { location: 'AuthUseCase.socialAuth' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[400](),
      };
    }
  };
}
