import { ResponseREST } from '@/shared/utils/rest-api/types';
import { IRegion } from '../domain/response';

export interface IFarmerlandRepository {
  provinces(): Promise<ResponseREST<Array<IRegion>>>;
  regencies(provinceCode: string): Promise<ResponseREST<Array<IRegion>>>;
  districts(regencyCode: string): Promise<ResponseREST<Array<IRegion>>>;
  villages(districtCode: string): Promise<ResponseREST<Array<IRegion>>>;
}
