/* eslint-disable */

import { TLoginSchema } from '@/packages/apps/auth/domain/request';
import { IResponseVerifyOtp } from '@/packages/apps/auth/domain/response';
import { AuthRepository } from '@/packages/apps/auth/repository';
import { AuthUseCase } from '@/packages/apps/auth/usecase';
import type { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProviders from 'next-auth/providers/credentials';
import { authRoute } from '../constants';
import { http, RestAPI } from './rest-api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProviders({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        input: { label: 'Input', type: 'text' },
        password: { label: 'Password', type: 'password' },
        // TODO: this used when we have OTP
        // token: { label: 'Token', type: 'text' },
        // otp: { label: 'OTP', type: 'text' },
        // purpose: { label: 'Purpose', type: 'text' },
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
  ],

  callbacks: {
    // Save user fields into JWT
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phone = (user as any).phone;
        token.avatar = (user as any).avatar;
        token.token = (user as any).token;
        token.role = (user as any).role;
      }
      return token;
    },

    // Expose fields into Session
    async session({ session, token }: any) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        phone: token.phone as string,
        avatar: token.avatar as string,
        token: token.token as string,
        role: token.role as string,
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
    maxAge: parseInt(process.env.NEXTAUTH_SESSION_MAX_AGE ?? '2592000'), // default 30 hari
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
