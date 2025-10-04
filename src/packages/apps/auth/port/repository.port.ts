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
  login(data: Partial<TLoginSchema>): Promise<ResponseREST<ILoginFirst>>;
  otpVerify(data: IRequestVerifyOtp): Promise<ResponseREST<IResponseVerifyOtp>>;
  register(data: TFirstFormRegisterSchema): Promise<ResponseREST<ILoginFirst>>;
  lovRole: () => Promise<ResponseREST<Array<ISelectOption>>>;
  registerFull: (data: Partial<TFormRegisterSchema>) => Promise<ResponseREST<void>>;
}
