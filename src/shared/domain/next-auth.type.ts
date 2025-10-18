import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
      token: string;
      role?: string;
      phone?: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    token: string;
    role?: string;
    phone?: string;
    provider?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    token: string;
    role?: string;
    phone?: string;
    provider?: string;
  }
}
