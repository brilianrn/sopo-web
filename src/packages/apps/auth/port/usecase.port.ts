import { ISelectOption, IUsecaseResponse } from '@/shared/domain/response.usecase';
import {
  IRequestVerifyOtp,
  TFirstFormRegisterSchema,
  TFormRegisterSchema,
  TLoginSchema,
} from '../domain/request';
import { ILoginFirst, IResponseVerifyOtp } from '../domain/response';

export interface IAuthUsecase {
  // TODO: used when we have OTP verified login(data: TLoginSchema): Promise<IUsecaseResponse<ILoginFirst>>;
  login(data: TLoginSchema): Promise<IUsecaseResponse<IResponseVerifyOtp>>;
  otpVerify(data: IRequestVerifyOtp): Promise<IUsecaseResponse<IResponseVerifyOtp>>;
  register(data: TFirstFormRegisterSchema): Promise<IUsecaseResponse<ILoginFirst>>;
  lovRole(): Promise<IUsecaseResponse<Array<ISelectOption>>>;
  registerFull: (data: TFormRegisterSchema) => Promise<IUsecaseResponse<void>>;
}
