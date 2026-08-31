import "server-only"

import bcrypt from "bcrypt"

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) throw new Error("ADMIN_PASSWORD_HASH is not set")

  return bcrypt.compare(password, hash)
}
