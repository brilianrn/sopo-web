import { validationMessage } from '@/shared/constants';
import { IUsecaseResponse } from '@/shared/domain/response.usecase';
import Logger from '@/shared/utils/logger';
import { IRegion } from '../domain/response';
import { IFarmerlandRepository } from '../port/repository.port';
import { IFarmerlandUsecase } from '../port/usecase.port';

export class FarmerlandUsecase implements IFarmerlandUsecase {
  private repository: IFarmerlandRepository;

  constructor(repository: IFarmerlandRepository) {
    this.repository = repository;
  }

  provinces = async (): Promise<IUsecaseResponse<Array<IRegion>>> => {
    try {
      const result = await this.repository.provinces();
      if (result?.code === 200) {
        return { data: result?.data, message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: validationMessage('Provinsi')[404](),
      };
    } catch (err) {
      Logger.error(err, { location: 'FarmerlandUsecase.lovRole' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[500](),
      };
    }
  };

  regencies = async (provinceCode: string): Promise<IUsecaseResponse<Array<IRegion>>> => {
    try {
      const result = await this.repository.regencies(provinceCode);
      if (result?.code === 200) {
        return { data: result?.data, message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: validationMessage('Kota/Kabupaten')[404](),
      };
    } catch (err) {
      Logger.error(err, { location: 'FarmerlandUsecase.lovRole' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[500](),
      };
    }
  };

  districts = async (regencyCode: string): Promise<IUsecaseResponse<Array<IRegion>>> => {
    try {
      const result = await this.repository.districts(regencyCode);
      if (result?.code === 200) {
        return { data: result?.data, message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: validationMessage('Kecamatan')[404](),
      };
    } catch (err) {
      Logger.error(err, { location: 'FarmerlandUsecase.lovRole' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[500](),
      };
    }
  };

  villages = async (districtCode: string): Promise<IUsecaseResponse<Array<IRegion>>> => {
    try {
      const result = await this.repository.villages(districtCode);
      if (result?.code === 200) {
        return { data: result?.data, message: result?.message };
      }
      return {
        error: new Error(result?.message),
        message: validationMessage('Kelurahan')[404](),
      };
    } catch (err) {
      Logger.error(err, { location: 'FarmerlandUsecase.lovRole' });
      return {
        error: new Error(err instanceof Error ? err.message : validationMessage()[500]()),
        message: validationMessage()[500](),
      };
    }
  };
}
