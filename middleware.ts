import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only redirect root, not /note (let /note load if valid)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/intro', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
