import { NextRequest, NextResponse } from "next/server"

import { verifyAdminPassword } from "@/lib/admin-password"
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth"
import { isRateLimited, registerFailedAttempt, clearAttempts } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  const identifier = request.headers.get("x-forwarded-for") ?? "unknown"

  if (isRateLimited(identifier)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 })
  }

  let body: { password: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  if (!body.password || typeof body.password !== "string") {
    return NextResponse.json({ error: "Password is required" }, { status: 400 })
  }

  const valid = await verifyAdminPassword(body.password)
  if (!valid) {
    registerFailedAttempt(identifier)
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  clearAttempts(identifier)

  const token = await createSessionToken()
  const response = NextResponse.json({ msg: "Successful" }, { status: 200 })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12
  })

  return response
}
