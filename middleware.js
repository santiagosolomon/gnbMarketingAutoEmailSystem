import { NextResponse } from 'next/server'
//cookies
import Cookies from 'js-cookie'


export function middleware(request) {
  const { pathname } = request.nextUrl;
  //const cookies = decodeURIComponent(request.cookies)
  const cookies = request.cookies.has('uD')

  if (pathname == '/' && cookies) {

    return NextResponse.redirect(new URL('/dashboard', request.url))

  } else if (pathname != '/' && !cookies) {

    return NextResponse.redirect(new URL('/', request.url))

  }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}