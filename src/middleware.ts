import { stackServerApp } from '@stackframe/stack'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Only protect /admin routes
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  try {
    const stackApp = stackServerApp({
      projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
      secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
    })

    // Get the user from Stack Auth
    const user = await stackApp.getUser({ req })

    // Check if user is authenticated and has admin privileges
    // You can customize this logic based on your needs
    // For example, check for specific email or metadata
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Optional: Add additional authorization checks here
    // For example, check if user email matches admin email
    // or check for admin role in user metadata

    return NextResponse.next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}