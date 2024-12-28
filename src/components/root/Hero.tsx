import Image from "next/image"

import CTAButton from "../common/CTAButton"
import ImgAppPreview from "@/assets/images/app_preview_hero.png"
import "@/styles/root/Hero.css"

export default function Hero() {
  return (
    <div className="mt-14 px-7">
      {/* Heading */}
      <div className="flex flex-col text-4xl font-bold text-neutral-800">
        <p>Shoot more.</p>
        <p className="text-accent-500">Organize less.</p>
      </div>
      {/* Description */}
      <div className="mt-5">
        <p className="text-neutral-600">
          Get rid of the headaches caused by unorganized photos. Simply add the date and time from the
          EXIF-data to filenames to keep your photos organized.
        </p>
      </div>
      {/* CTA */}
      <div className="mt-8">
        <CTAButton id="btn-hero-cta" />
      </div>
      {/* Preview */}
      <div className="mt-10">
        <Image src={ImgAppPreview} alt="exifoo Preview" />
      </div>
    </div>
  )
}
