import "server-only"

const BASE_URL = "https://api.lemonsqueezy.com/v1"

export async function getLicenseKeyUserInfo(
  licenseKeyId: string
): Promise<{ userName: string; userEmail: string }> {
  const response = await fetch(`${BASE_URL}/license-keys/${licenseKeyId}`, {
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMSQZY_API_KEY}`
    },
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error(`LemSqzy API error: ${response.status}`)
  }

  const data = await response.json()
  const attributes = data.data.attributes

  return {
    userName: attributes.user_name,
    userEmail: attributes.user_email
  }
}
