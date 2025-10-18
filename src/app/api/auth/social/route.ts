import { IResponseLogin } from '@/packages/apps/auth/domain/response';
import { authPath, validationMessage } from '@/shared/constants';
import Logger from '@/shared/utils/logger';
import { RestAPI } from '@/shared/utils/rest-api';
import { response } from '@/shared/utils/rest-api/response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const api = new RestAPI();

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const res = await api.post<IResponseLogin>({ endpoint: authPath.social, body });
    if (res?.code !== HttpStatusCode.Ok) {
      return response[400]({ message: validationMessage()[400]() });
    }

    return response[200]({
      data: res?.data,
      message: validationMessage()[200](),
    });
  } catch (error: unknown) {
    Logger.error(error, { location: '/api/auth/social' });
    return response[500]({ message: validationMessage()[500]() });
  }
};
