import { TFormRegisterSchema } from '@/packages/apps/auth/domain/request';
import { authPath, validationMessage } from '@/shared/constants';
import Logger from '@/shared/utils/logger';
import { RestAPI } from '@/shared/utils/rest-api';
import { response } from '@/shared/utils/rest-api/response';
import { Context } from '@/shared/utils/rest-api/types';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server'; // Added NextResponse

export const dynamic = 'force-dynamic';

const api = new RestAPI();

export const PUT = async (req: NextRequest, context: unknown) => {
  try {
    const { token } = (context as Context<{ token: string }>)?.params;
    if (!token) {
      return response[400]({ message: validationMessage()[400]() });
    }

    const body: Partial<TFormRegisterSchema> = await req.json();
    const res = await api.put<void>({ endpoint: authPath.registerFullForm(token), body });
    if (res?.code === HttpStatusCode.Ok) {
      return response[200]({ message: validationMessage('registrasi')[200]() });
    }

    return response[400]({ message: validationMessage()[400]() });
  } catch (error: unknown) {
    Logger.error(error, { location: '/api/auth/register/[token]' });
    return response[500]({ message: validationMessage()[500]() });
  }
};
