import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import Button from "@/components/common/Button"
import DynamicButton from "@/components/download/DynamicButton"
import Cards from "@/components/download/Cards"
import { getMacOSDownloadURL } from "@/utils/server/github"
import ImgAppPreview from "@/assets/images/app_preview_rename_success.png"
import SVGApple from "@/assets/icons/Apple.svg"

export const metadata: Metadata = {
  title: "Download exifoo",
  description:
    "exifoo helps you keep your photos organized by adding the date and time from EXIF data to the filename."
}

export default async function Download() {
  const downloadURLMacOSArm64 = await getMacOSDownloadURL("arm64")
  const downloadURLMacOSX64 = await getMacOSDownloadURL("x64")

  return (
    <div className="flex flex-col items-center sm:overflow-x-hidden">
      <div className="mt-14 w-full px-7 sm:mt-40 sm:max-w-screen-xl">
        <div className="sm:flex">
          <div className="sm:w-1/2">
            <h1 className="font-logo text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
              Download <span className="tracking-tighter text-logo">exifoo</span>
            </h1>
            <h2 className="mt-3 text-neutral-600 sm:mt-6 sm:text-lg">
              Shoot more. Organize less. With{" "}
              <span className="font-logo text-xl font-semibold tracking-tight text-logo">exifoo</span> you can
              keep your photos organized.
            </h2>
            <div className="mt-8 sm:mt-12">
              <div className="lg:flex lg:items-center">
                <DynamicButton
                  downloadURLMacOS={{ arm64: downloadURLMacOSArm64, x64: downloadURLMacOSX64 }}
                />
                <p className="mt-3 text-sm text-neutral-600 lg:ml-5 lg:mt-0">
                  macOS 10.15 (Catalina) or higher
                </p>
              </div>
              <div className="mt-3">
                <Link className="text-xs text-neutral-400 underline" href="/release-notes">
                  Release Notes
                </Link>
                <Link className="ml-2 text-xs text-neutral-400 underline" href="#other-downloads">
                  Other downloads
                </Link>
              </div>
            </div>
          </div>
          {/* Preview */}
          <div className="mt-10 sm:relative sm:mt-32 sm:w-1/2">
            <div className="sm:absolute sm:bottom-1/2 sm:left-5 sm:translate-y-1/2">
              <Image
                src={ImgAppPreview}
                alt="exifoo Preview"
                className="select-none sm:min-w-[900px]"
                sizes="(max-width: 640px) 500px, 2552px"
                priority
              />
            </div>
          </div>
        </div>
        <Cards />
        <div className="mt-10">
          <h2
            id="other-downloads"
            className="scroll-mt-32 text-xl font-semibold text-neutral-700 sm:text-2xl">
            Other downloads
          </h2>
          <p className="mt-2 text-neutral-600 sm:mt-4"> Need a specific download? Get it here.</p>
          <div className="mt-10 flex w-fit flex-col sm:flex-row">
            <Button color="primary" href={downloadURLMacOSArm64}>
              <div className="flex items-center">
                <SVGApple className="h-5 w-5" />
                <p className="ml-2">Download for macOS (Apple Chip)</p>
              </div>
            </Button>
            <Button className="mt-3 sm:ml-5 sm:mt-0" color="primary" href={downloadURLMacOSX64}>
              <div className="flex items-center">
                <SVGApple className="h-5 w-5" />
                <p className="ml-2">Download for macOS (Intel Chip)</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
