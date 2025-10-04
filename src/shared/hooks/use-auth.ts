import { IUser } from '@/packages/apps/auth/domain/response';
import { signOut as nextAuthSignout, useSession } from 'next-auth/react';

export const useAuth = () => {
  const { status, data: session, update } = useSession();

  const isLoadingAuth = status === 'loading';
  const isLoggedIn = status === 'authenticated';

  const dataUser = session?.user as unknown as IUser & { token: string };

  const signOut = () => {
    return nextAuthSignout({
      redirect: false,
      callbackUrl: window.location.href,
    });
  };

  return {
    isLoggedIn,
    isLoadingAuth,
    signOut,
    session,
    dataUser,
    update,
  };
};
