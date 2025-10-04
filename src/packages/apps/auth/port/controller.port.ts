import { ISelectOption, IUsecaseResponse } from '@/shared/domain/response.usecase';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import {
  IRequestVerifyOtp,
  TFirstFormRegisterSchema,
  TFormRegisterSchema,
  TLoginSchema,
} from '../domain/request';
import { ILoginFirst, IResponseVerifyOtp } from '../domain/response';

export interface IAuthController {
  login: UseMutationResult<IUsecaseResponse<ILoginFirst>, unknown, TLoginSchema>;
  otpVerify: UseMutationResult<IUsecaseResponse<IResponseVerifyOtp>, unknown, IRequestVerifyOtp>;
  register: UseMutationResult<IUsecaseResponse<ILoginFirst>, unknown, TFirstFormRegisterSchema>;
  lovRole: UseQueryResult<Array<ISelectOption>, unknown>;
  registerFull: UseMutationResult<IUsecaseResponse<void>, unknown, TFormRegisterSchema>;
}
