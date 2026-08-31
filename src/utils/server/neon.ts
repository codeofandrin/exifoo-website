import "server-only"

import { neon } from "@neondatabase/serverless"

export function getSql() {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error("NEON_DATABASE_URL is not set")
  }
  return neon(process.env.NEON_DATABASE_URL)
}

export interface FeedbackDataType {
  licenseKeyId: string
  userName: string
  userEmail: string
  usageFrequency: string
  missingOrInconvenient: string | null
  proFeatures: string[]
  proFeaturesMoreFormats: string | null
  proFeaturesOther: string | null
  fairPrice: string
  createdAt: Date
}

export interface FeedbackInsertDataType {
  licenseKeyId: string
  userName: string
  userEmail: string
  usageFrequency: string
  missingOrInconvenient: string | null
  proFeatures: string[]
  proFeaturesMoreFormats: string | null
  proFeaturesOther: string | null
  fairPrice: string
}

export async function insertFeedback({
  licenseKeyId,
  userName,
  userEmail,
  usageFrequency,
  missingOrInconvenient,
  proFeatures,
  proFeaturesMoreFormats,
  proFeaturesOther,
  fairPrice
}: FeedbackInsertDataType): Promise<void> {
  const sql = getSql()
  await sql`
        INSERT INTO feedback (
            license_key_id, user_name, user_email,
            usage_frequency, missing_or_inconvenient,
            pro_features, pro_features_more_formats, pro_features_other,
            fair_price
        ) VALUES (
            ${licenseKeyId}, ${userName}, ${userEmail},
            ${usageFrequency}, ${missingOrInconvenient},
            ${proFeatures}, ${proFeaturesMoreFormats}, ${proFeaturesOther},
            ${fairPrice}
        )
    `
}

export async function getFeedbackIds(): Promise<string[]> {
  const sql = getSql()
  const rows = await sql`SELECT license_key_id AS "licenseKeyId" FROM feedback`
  return (rows as { licenseKeyId: string }[]).map((row) => row.licenseKeyId)
}

export async function getAllFeedbacks(): Promise<FeedbackDataType[]> {
  const sql = getSql()
  const feedbacks = await sql`
    SELECT
        license_key_id AS "licenseKeyId", user_name AS "userName", user_email AS "userEmail",
        usage_frequency AS "usageFrequency", missing_or_inconvenient AS "missingOrInconvenient",
        pro_features AS "proFeatures", pro_features_more_formats AS "proFeaturesMoreFormats",
        pro_features_other AS "proFeaturesOther",
        fair_price AS "fairPrice", created_at AS "createdAt"
    FROM feedback
  `
  return feedbacks as FeedbackDataType[]
}
