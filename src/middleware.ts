import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextFetchEvent } from "next/server"

export default withAuth(
  function middleware(req) {
    if (!req.nextUrl.pathname.startsWith('/admin/')) {
      return NextResponse.next()
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.email === 'bryantravissmith@gmail.com',
    },
    pages: {
      signIn: "/auth/login",
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/api/planes/:path*"],
}
