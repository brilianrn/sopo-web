import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/apps/auth/login',
  },
});

export const config = {
  matcher: ['/apps/account', '/apps/farmerland/:path*'],
};
