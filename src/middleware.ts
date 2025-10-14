import { setCorsHeaders } from '@/shared/utils';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const authMiddleware = withAuth({
  pages: { signIn: '/apps/auth/login' },
});

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/');
  if (isApiRoute && req.method === 'OPTIONS') {
    const corsResponse = new NextResponse(null, { status: 204 });
    return setCorsHeaders(corsResponse);
  }

  // eslint-disable-next-line
  const authResult = await authMiddleware(req as any, event);
  if (authResult instanceof NextResponse && authResult.status !== 200) {
    if (isApiRoute) {
      return setCorsHeaders(authResult);
    }
    return authResult;
  }

  if (isApiRoute) {
    const responseWithCors = NextResponse.next();
    return setCorsHeaders(responseWithCors);
  }

  return authResult;
}

export const config = {
  matcher: ['/apps/account', '/apps/farmerland/:path*'],
};
