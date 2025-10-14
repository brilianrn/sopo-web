import { rolePath, validationMessage } from '@/shared/constants';
import { ISelectOption } from '@/shared/domain/response.usecase';
import Logger from '@/shared/utils/logger';
import { RestAPI } from '@/shared/utils/rest-api';
import { response } from '@/shared/utils/rest-api/response';
import { HttpStatusCode } from 'axios';

export const dynamic = 'force-dynamic';

const api = new RestAPI();

export const GET = async () => {
  try {
    const res = await api.get<Array<ISelectOption>>({ endpoint: rolePath.lov });
    if (res?.code !== HttpStatusCode.Ok) {
      return response[404]({ message: validationMessage('Daftar pengguna')[404]() });
    }

    return response[200]({
      data: res?.data,
      message: validationMessage()[200](),
    });
  } catch (error: unknown) {
    Logger.error(error, { location: '/api/role/lov' });
    return response[500]({ message: validationMessage()[500]() });
  }
};
