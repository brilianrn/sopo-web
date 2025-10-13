import { IRegion } from '@/packages/apps/farmerland/domain/response';
import { pathRegion, validationMessage } from '@/shared/constants';
import Logger from '@/shared/utils/logger';
import { RestAPI } from '@/shared/utils/rest-api';
import { response } from '@/shared/utils/rest-api/response';

export const dynamic = 'force-dynamic';

const api = new RestAPI();

export const GET = async () => {
  try {
    const res = await api.get<Array<IRegion>>({
      endpoint: pathRegion.province,
      config: { baseURL: process.env.BASE_API_URL_REGION_IDN },
    });

    if (!res?.data?.length) {
      return response[404]({ message: validationMessage('Provinsi')[404]() });
    }
    return response[200]({
      data: res?.data,
      message: validationMessage('muat data provinsi')[200](),
    });
  } catch (error: unknown) {
    Logger.error(error);
    return response[500]({ message: validationMessage()[500]() });
  }
};
