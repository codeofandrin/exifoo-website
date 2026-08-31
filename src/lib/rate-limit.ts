import "server-only"

import { createHash } from "crypto"

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

const attempts = new Map<string, { count: number; resetAt: number }>()

function hashIdentifier(identifier: string): string {
  return createHash("sha256").update(identifier).digest("hex")
}

export function isRateLimited(identifier: string): boolean {
  const key = hashIdentifier(identifier)
  const entry = attempts.get(key)
  if (!entry || entry.resetAt < Date.now()) return false

  return entry.count >= MAX_ATTEMPTS
}

export function registerFailedAttempt(identifier: string): void {
  const key = hashIdentifier(identifier)
  const entry = attempts.get(key)

  if (!entry || entry.resetAt < Date.now()) {
    attempts.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS })
    return
  }

  entry.count += 1
}

export function clearAttempts(identifier: string): void {
  attempts.delete(hashIdentifier(identifier))
}
