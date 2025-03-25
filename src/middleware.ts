import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const ifPublic = path == '/login' || path == '/signup'|| path == '/verifyemail'

  const token = request.cookies.get("token")?.value || ''

  if ( ifPublic && token){
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if(!ifPublic && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}