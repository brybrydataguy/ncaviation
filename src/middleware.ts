import { stackServerApp } from './stack/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Only protect /admin routes
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  try {
    // Get the user from Stack Auth - pass the Next.js request object
    const user = await stackServerApp.getUser({
      or: 'return-null',
      tokenStore: req
    })

    // Check if user is authenticated
    if (!user) {
      return NextResponse.redirect(new URL('/handler/sign-in', req.url))
    }

    // Optional: Add additional authorization checks here
    // For example, check if user has admin role or specific email

    return NextResponse.next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.redirect(new URL('/handler/sign-in', req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}