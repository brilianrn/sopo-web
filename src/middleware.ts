import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const authMiddleware = withAuth({
  pages: {
    signIn: '/apps/auth/login',
  },
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 CORS Handling
  if (pathname.startsWith('/api/')) {
    const res = NextResponse.next();

    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: res.headers });
    }

    // 🔹 Public APIs (tanpa token)
    const publicAPIs = ['/api/auth', '/api/region', '/api/role/lov'];
    const isPublicAPI = publicAPIs.some((api) => pathname.startsWith(api));

    if (isPublicAPI) return res;

    // 🔹 Private APIs (harus pakai token)
    const token = req.headers.get('authorization');
    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return res;
  }

  // 🔹 Protected pages
  if (pathname.startsWith('/apps/account') || pathname.startsWith('/apps/farmerland')) {
    return (authMiddleware as any)(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/apps/account', '/apps/farmerland/:path*'],
};
