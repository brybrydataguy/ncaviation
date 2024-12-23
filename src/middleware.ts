import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin/')) {
    const auth = withAuth({
      callbacks: {
        authorized: ({ token }) => token?.email === 'bryantravissmith@gmail.com',
      },
      pages: {
        signIn: "/auth/login",
      },
    })
    return auth(request)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
