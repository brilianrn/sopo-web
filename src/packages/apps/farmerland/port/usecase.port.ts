import { IUsecaseResponse } from '@/shared/domain/response.usecase';
import { IRegion } from '../domain/response';

export interface IFarmerlandUsecase {
  provinces(): Promise<IUsecaseResponse<Array<IRegion>>>;
  regencies(provinceCode: string): Promise<IUsecaseResponse<Array<IRegion>>>;
  districts(regencyCode: string): Promise<IUsecaseResponse<Array<IRegion>>>;
  villages(districtCode: string): Promise<IUsecaseResponse<Array<IRegion>>>;
}
