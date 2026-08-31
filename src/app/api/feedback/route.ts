import { NextRequest, NextResponse } from "next/server"

import { getLicenseKeyUserInfo } from "@/utils/server/lemsqzy"
import { insertFeedback } from "@/utils/server/neon"

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("X-API-Key")
  if (!apiKey || apiKey !== process.env.FEEDBACK_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: {
    license_key_id: string
    usage_frequency: string
    likes: string
    missing_or_inconvenient: string
    pro_features: string[]
    pro_features_more_formats: string | null
    pro_features_other: string | null
    fair_price: string
    testimonial_consent: string
    name: string | null
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const {
    license_key_id,
    usage_frequency,
    likes,
    missing_or_inconvenient,
    pro_features,
    pro_features_more_formats,
    pro_features_other,
    fair_price,
    testimonial_consent,
    name
  } = body

  try {
    const { userName, userEmail } = await getLicenseKeyUserInfo(license_key_id)

    await insertFeedback({
      licenseKeyId: license_key_id,
      userName,
      userEmail,
      usageFrequency: usage_frequency,
      likes,
      missingOrInconvenient: missing_or_inconvenient,
      proFeatures: pro_features,
      proFeaturesMoreFormats: pro_features_more_formats ?? null,
      proFeaturesOther: pro_features_other ?? null,
      fairPrice: fair_price,
      testimonialConsent: testimonial_consent,
      name: name ?? null
    })
  } catch (err) {
    console.error("Feedback submission error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  return NextResponse.json({ msg: "Successful" }, { status: 200 })
}
