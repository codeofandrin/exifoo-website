import Image from "next/image"

import CTAButton from "../common/CTAButton"
import ImgAppPreview from "@/assets/images/app_preview_hero.png"

export default function Hero() {
  return (
    <div className="mt-14 px-7">
      {/* Heading */}
      <div className="flex flex-col text-4xl font-bold text-neutral-800">
        <p>Shoot more.</p>
        <p className="text-accent-500">Organize less.</p>
      </div>
      {/* Description */}
      <div className="mt-6">
        <p className="text-neutral-500">
          <span className="font-logo font-medium text-logo">exifoo</span> helps you keep your photos organized
          by adding the date and time of capture to the filename.
        </p>
      </div>
      {/* CTA */}
      <div className="mt-10">
        <CTAButton>Download for free</CTAButton>
      </div>
      {/* Preview */}
      <div className="mt-10">
        <Image src={ImgAppPreview} alt="exifoo Preview" />
      </div>
    </div>
  )
}
