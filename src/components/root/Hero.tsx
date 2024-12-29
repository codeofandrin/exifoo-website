import Image from "next/image"

import CTAButton from "../common/CTAButton"
import ImgAppPreview from "@/assets/images/app_preview_hero.png"

export default function Hero() {
  return (
    <div className="mt-14 w-full px-7 sm:mt-60 sm:max-w-screen-xl">
      <div className="sm:flex">
        <div className="sm:w-1/2">
          {/* Heading */}
          <div className="flex flex-col text-4xl font-bold font-logo tracking-tight text-neutral-800 sm:text-6xl">
            <p>Shoot more.</p>
            <p className="text-accent-500">Organize less.</p>
          </div>
          {/* Description */}
          <div className="mt-6 sm:mt-10">
            <p className="text-neutral-500 sm:text-lg">
              <span className="font-logo font-medium text-logo">exifoo</span> helps you keep your photos
              organized by adding the date and time of capture to the filename.
            </p>
          </div>
          {/* CTA */}
          <div className="mt-6 sm:mt-10">
            <CTAButton className="w-full sm:w-72">Download for free</CTAButton>
          </div>
        </div>
        {/* Preview */}
        <div className="mt-10 sm:relative sm:mt-0 sm:w-1/2">
          <div className="sm:absolute sm:bottom-1/2 sm:left-10 sm:translate-y-1/2 md:left-20">
            <Image src={ImgAppPreview} alt="exifoo Preview" className="sm:min-w-[950px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
