import { ISelectOption } from '@/shared/domain/response.usecase';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export interface IFarmerlandController {
  provinces: UseQueryResult<Array<ISelectOption>, unknown>;
  regencies: UseMutationResult<Array<ISelectOption>, unknown, string>;
  districts: UseMutationResult<Array<ISelectOption>, unknown, string>;
  villages: UseMutationResult<Array<ISelectOption>, unknown, string>;
}
