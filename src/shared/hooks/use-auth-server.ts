import { IUser } from '@/packages/apps/auth/domain/response';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../utils';

export const useAuthServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const props = await getServerSession(req, res, authOptions);
  const dataUser = props?.user as unknown as IUser & { token: string };

  return dataUser;
};
