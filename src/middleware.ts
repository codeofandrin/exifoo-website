import { NextRequest, NextResponse } from "next/server"

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const valid = token ? await verifySessionToken(token) : false
  const isLoginPage = request.nextUrl.pathname.startsWith("/admin/login")

  if (isLoginPage) {
    if (valid) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  if (!valid) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"]
}
