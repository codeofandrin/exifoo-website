import "server-only"

import { jwtVerify, SignJWT } from "jose"

export const SESSION_COOKIE = "admin_session"
const SESSION_DURATION = "12h"

async function getSessionSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set")

  // normalize the secret to a full-entropy 256-bit key regardless of its raw length
  // uses Web Crypto (crypto.subtle) instead of node:crypto so this also works in the Edge Runtime (middleware)
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret))
  return new Uint8Array(digest)
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(await getSessionSecretKey())
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, await getSessionSecretKey())
    return true
  } catch {
    return false
  }
}
