/* eslint-disable */

import { TLoginSchema } from '@/packages/apps/auth/domain/request';
import { IResponseVerifyOtp } from '@/packages/apps/auth/domain/response';
import { AuthRepository } from '@/packages/apps/auth/repository';
import { AuthUseCase } from '@/packages/apps/auth/usecase';
import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { authRoute } from '../constants';
import Logger from './logger';
import { http, RestAPI } from './rest-api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        input: { label: 'Input', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const dataStoreApi = new RestAPI(http);
          const authRepository = new AuthRepository(dataStoreApi);
          const authUseCase = new AuthUseCase(authRepository);

          const payload: TLoginSchema = {
            input: credentials?.input || '',
            password: credentials?.password || '',
          };

          const response = await authUseCase.login(payload);
          if (response?.error) return null;

          return {
            id: response?.data?.user.id,
            ...response?.data?.user,
            token: response?.data?.token,
          } as User &
            IResponseVerifyOtp & { phone?: string; avatar?: string; token: string; role: string };
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const dataStoreApi = new RestAPI(http);
      const authRepository = new AuthRepository(dataStoreApi);
      const authUseCase = new AuthUseCase(authRepository);

      try {
        if (account?.provider === 'google' && account.id_token) {
          token.provider = 'google';
          token.idToken = account.id_token;
          token.accessToken = account.access_token;

          const response = await authUseCase.socialAuth(account.id_token);
          if (response?.data) {
            token.id = response.data.user.id;
            token.email = response.data.user.email || '';
            token.name = response.data.user.name;
            token.avatar = response.data.user.avatar;
            token.role = response.data.user.role;
            token.phone = response.data.user.phone;
            token.token = response.data.token;
          }
        }

        if (user && account?.provider === 'credentials') {
          token.provider = 'credentials';
          token.id = user.id ?? token.id;
          token.email = user.email ?? token.email;
          token.name = user.name ?? token.name;
          token.avatar =
            (((user as any).avatar ?? token.avatar) || (user as any).image) ?? token.picture;
          token.role = (user as any).role ?? token.role;
          token.phone = (user as any).phone ?? token.phone;
          token.token = (user as any).token;
        }

        return token;
      } catch (err) {
        Logger.error(err, { location: 'NextAuth.jwt' });
        return token;
      }
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        avatar: token.avatar as string,
        token: token.token as string,
        role: token.role as string,
        phone: token.phone as string,
        provider: token.provider as string,
      };
      return session;
    },
  },

  pages: {
    signIn: authRoute.login,
    signOut: authRoute.login,
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.NEXTAUTH_SESSION_MAX_AGE ?? '2592000'),
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
};
