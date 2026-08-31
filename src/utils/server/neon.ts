import "server-only"

import { neon } from "@neondatabase/serverless"

function getSql() {
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
  likes: string
  missingOrInconvenient: string
  proFeatures: string[]
  proFeaturesMoreFormats: string | null
  proFeaturesOther: string | null
  fairPrice: string
  testimonialConsent: string
  name: string | null
  createdAt: Date
}

export interface FeedbackInsertDataType {
  licenseKeyId: string
  userName: string
  userEmail: string
  usageFrequency: string
  likes: string
  missingOrInconvenient: string
  proFeatures: string[]
  proFeaturesMoreFormats: string | null
  proFeaturesOther: string | null
  fairPrice: string
  testimonialConsent: string
  name: string | null
}

export async function insertFeedback({
  licenseKeyId,
  userName,
  userEmail,
  usageFrequency,
  likes,
  missingOrInconvenient,
  proFeatures,
  proFeaturesMoreFormats,
  proFeaturesOther,
  fairPrice,
  testimonialConsent,
  name
}: FeedbackInsertDataType): Promise<void> {
  const sql = getSql()
  await sql`
        INSERT INTO feedback (
            license_key_id, user_name, user_email,
            usage_frequency, likes, missing_or_inconvenient,
            pro_features, pro_features_more_formats, pro_features_other,
            fair_price, testimonial_consent, name
        ) VALUES (
            ${licenseKeyId}, ${userName}, ${userEmail},
            ${usageFrequency}, ${likes}, ${missingOrInconvenient},
            ${proFeatures}, ${proFeaturesMoreFormats}, ${proFeaturesOther},
            ${fairPrice}, ${testimonialConsent}, ${name}
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
        usage_frequency AS "usageFrequency", likes, missing_or_inconvenient AS "missingOrInconvenient",
        pro_features AS "proFeatures", pro_features_more_formats AS "proFeaturesMoreFormats",
        pro_features_other AS "proFeaturesOther",
        fair_price AS "fairPrice", testimonial_consent AS "testimonialConsent", name, created_at AS "createdAt"
    FROM feedback
  `
  return feedbacks as FeedbackDataType[]
}
