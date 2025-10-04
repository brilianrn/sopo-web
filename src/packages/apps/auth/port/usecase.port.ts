import { ISelectOption, IUsecaseResponse } from '@/shared/domain/response.usecase';
import {
  IRequestVerifyOtp,
  TFirstFormRegisterSchema,
  TFormRegisterSchema,
  TLoginSchema,
} from '../domain/request';
import { ILoginFirst, IResponseVerifyOtp } from '../domain/response';

export interface IAuthUsecase {
  login(data: TLoginSchema): Promise<IUsecaseResponse<ILoginFirst>>;
  otpVerify(data: IRequestVerifyOtp): Promise<IUsecaseResponse<IResponseVerifyOtp>>;
  register(data: TFirstFormRegisterSchema): Promise<IUsecaseResponse<ILoginFirst>>;
  lovRole(): Promise<IUsecaseResponse<Array<ISelectOption>>>;
  registerFull: (data: TFormRegisterSchema) => Promise<IUsecaseResponse<void>>;
}
