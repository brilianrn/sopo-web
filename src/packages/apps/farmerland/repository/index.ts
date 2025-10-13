import { regionRouteServer } from '@/shared/constants';
import Logger from '@/shared/utils/logger';
import { RestAPI } from '@/shared/utils/rest-api';
import { IRegion } from '../domain/response';
import { IFarmerlandRepository } from '../port/repository.port';

export class FarmerlandRepository implements IFarmerlandRepository {
  private restApi: RestAPI;

  constructor(api: RestAPI) {
    this.restApi = api;
  }

  provinces = async () => {
    try {
      const res = await this.restApi.get<Array<IRegion>>({
        isNextApi: true,
        endpoint: regionRouteServer.province,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'FarmerlandRepository.provinces' });
      throw error;
    }
  };

  regencies = async (provinceCode: string) => {
    try {
      const res = await this.restApi.get<Array<IRegion>>({
        isNextApi: true,
        queryParam: { province: provinceCode },
        endpoint: regionRouteServer.regency,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'FarmerlandRepository.regencies' });
      throw error;
    }
  };

  districts = async (regencyCode: string) => {
    try {
      const res = await this.restApi.get<Array<IRegion>>({
        isNextApi: true,
        queryParam: { regency: regencyCode },
        endpoint: regionRouteServer.district,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'FarmerlandRepository.districts' });
      throw error;
    }
  };

  villages = async (districtCode: string) => {
    try {
      const res = await this.restApi.get<Array<IRegion>>({
        isNextApi: true,
        queryParam: { district: districtCode },
        endpoint: regionRouteServer.village,
      });
      return res;
    } catch (error) {
      Logger.error(error, { location: 'FarmerlandRepository.villages' });
      throw error;
    }
  };
}
