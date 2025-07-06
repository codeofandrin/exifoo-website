import "server-only"

const API_BASE_URL = "https://api.github.com"

async function request(method: string, url: string): Promise<Record<any, any> | Record<any, any>[]> {
    const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GH_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "exifoo (exifoo.vercel.app)"
    }

    const data = await fetch(`${API_BASE_URL}${url}`, { method, headers, cache: "no-store" })
    return data.json()
}

export async function getMacOSDownloadURL(arch: string): Promise<string> {
    const latestReleaseUrl = "/repos/codeofandrin/exifoo-releases/releases/latest"
    const data: Record<any, any> = await request("GET", latestReleaseUrl)
    const releaseAssets: Record<string, any>[] = data.assets

    let downloadUrl
    for (let i = 0; i < releaseAssets?.length; i++) {
        const asset = releaseAssets[i]
        const assetName: string = asset.name
        if (assetName.includes(".dmg") && assetName.includes(arch)) {
            downloadUrl = asset.browser_download_url
            break
        }
    }

    return downloadUrl
}

export async function getReleaseNotes(): Promise<string[]> {
    const releasesUrl = "/repos/codeofandrin/exifoo-releases/releases"
    const data = (await request("GET", releasesUrl)) as Record<string, any>[]

    let releaseNotes: string[] = []
    for (let i = 0; i < data.length; i++) {
        const release = data[i]
        releaseNotes.push(release.body)
    }

    return releaseNotes
}
