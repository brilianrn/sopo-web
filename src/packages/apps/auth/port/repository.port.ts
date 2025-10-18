import { ISelectOption } from '@/shared/domain/response.usecase';
import { ResponseREST } from '@/shared/utils/rest-api/types';
import {
  IRequestVerifyOtp,
  TFirstFormRegisterSchema,
  TFormRegisterSchema,
  TLoginSchema,
} from '../domain/request';
import { ILoginFirst, IResponseVerifyOtp } from '../domain/response';

export interface IAuthRepository {
  // TODO: used when we have OTP verified login(data: Partial<TLoginSchema>): Promise<ResponseREST<ILoginFirst>>;
  login(data: Partial<TLoginSchema>): Promise<ResponseREST<IResponseVerifyOtp>>;
  otpVerify(data: IRequestVerifyOtp): Promise<ResponseREST<IResponseVerifyOtp>>;
  register(data: TFirstFormRegisterSchema): Promise<ResponseREST<ILoginFirst>>;
  lovRole: () => Promise<ResponseREST<Array<ISelectOption>>>;
  registerFull: (data: Partial<TFormRegisterSchema>) => Promise<ResponseREST<void>>;
  socialAuth: (token: string) => Promise<ResponseREST<IResponseVerifyOtp>>;
}
