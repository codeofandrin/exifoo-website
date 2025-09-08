import Image from "next/image"

import CTAButton from "../common/CTAButton"
import Button from "../common/Button"
import { GeneralLinks } from "@/utils/constants"
import ExternalLink from "../common/ExternalLink"
import ImgAppPreview from "@/assets/images/app_preview_hero.png"
import ImgBMCLogo from "@/assets/images/bmc_logo.png"

export default function Hero() {
  return (
    <div className="mt-14 w-full px-7 sm:mt-44 sm:max-w-screen-xl">
      <div className="sm:flex">
        <div className="sm:w-1/2">
          <div className="w-fit lg:flex">
            <div className="flex w-fit items-center rounded-full bg-primary-50 py-2 pl-2 pr-3 text-sm font-medium text-primary-700 shadow-sm ring-1 ring-inset ring-primary-700/10">
              <div className="rounded-full bg-primary-500 px-2 py-0.5 text-white">NEW</div>
              <div className="ml-3">
                Free to use and{" "}
                <ExternalLink href="https://github.com/codeofandrin/exifoo" color="underline">
                  open source
                </ExternalLink>{" "}
                🚀
              </div>
            </div>
            <Button
              href={GeneralLinks.buyMeACoffeeURL}
              target="_blank"
              className="mt-2 w-full rounded-full border-[#b39b03] bg-[#ffdd04] font-bold sm:w-48 lg:ml-2 lg:mt-0">
              <div className="flex items-center">
                <Image src={ImgBMCLogo} alt="BMC Logo" className="w-6 select-none" />
                <p className="ml-1 text-xs text-neutral-900">Buy me a coffee</p>
              </div>
            </Button>
          </div>
          {/* Heading */}
          <div className="mt-12 flex flex-col">
            <h1 className="font-logo text-4xl font-bold tracking-tight text-neutral-800 sm:text-6xl">
              <p>Shoot more.</p>
              <p className="text-accent-500">Organize less.</p>
            </h1>
          </div>
          {/* Description */}
          <div className="mt-6 sm:mt-10">
            <h2 className="text-neutral-500 sm:text-lg">
              <span className="font-logo font-medium text-logo">exifoo</span> helps you keep your photos and
              videos organized by adding the date and time of capture to the filename.
            </h2>
          </div>
          {/* CTA */}
          <div className="mt-6 sm:mt-10">
            <CTAButton href="/download" className="w-full sm:w-72">
              Get started now
            </CTAButton>
          </div>
        </div>
        {/* Preview */}
        <div className="mt-10 sm:relative sm:mt-0 sm:w-1/2">
          <div className="sm:absolute sm:bottom-1/2 sm:left-10 sm:translate-y-1/2 md:left-20">
            <Image
              src={ImgAppPreview}
              alt="exifoo Preview"
              className="select-none sm:min-w-[950px]"
              sizes="(max-width: 640px) 500px, 2552px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
