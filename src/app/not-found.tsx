"use client"

import Image from "next/image"

import Button from "@/components/common/Button"
import { EMail } from "@/utils/constants"
import ImgNotFoundIllus from "@/assets/images/not_found_illus.png"

export default function NotFound() {
  function handleContactSupport() {
    window.open(`mailto:${EMail.help}`, "_blank")
  }

  function handleReturnHome() {
    window.location.href = "/"
  }

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image src={ImgNotFoundIllus} alt={ImgNotFoundIllus.src} className="w-96" />
      <h1 className="mt-6 font-logo text-6xl font-semibold text-neutral-800">Page not found</h1>
      <p className="mt-8 text-lg font-medium text-neutral-500">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-14 flex">
        <Button color="accent" className="w-40" onClick={handleContactSupport}>
          Contact Support
        </Button>
        <Button color="primary" className="ml-5 w-40" onClick={handleReturnHome}>
          Return Home
        </Button>
      </div>
    </div>
  )
}
