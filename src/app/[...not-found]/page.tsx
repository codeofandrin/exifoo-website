"use client"

import Image from "next/image"

import Button from "@/components/common/Button"
import ImgNotFoundIllus from "@/assets/images/not_found_illus.png"
import SVGArrowLeft from "@/assets/icons/ArrowLeft.svg"

export default function NotFound() {
  function handleReturnHome() {
    window.location.href = "/"
  }

  return (
    <div className="flex h-screen w-full flex-col items-center px-7">
      <div className="h-1/2 justify-start">
        <div className="flex h-full flex-col justify-end">
          <Image src={ImgNotFoundIllus} alt={ImgNotFoundIllus.src} className="w-60 select-none sm:w-96" />
        </div>
      </div>
      <div className="shrink-0">
        <h1 className="mt-4 text-center font-logo text-4xl font-semibold tracking-tight text-neutral-800 sm:mt-6 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 text-center font-medium text-neutral-500 sm:mt-8 sm:text-lg">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      <div className="h-1/2 justify-end">
        <div className="mt-8 flex w-full flex-col justify-center sm:mt-14 sm:flex-row">
          <Button color="primary" className="mt-3 w-full sm:mt-0 sm:w-40" onClick={handleReturnHome}>
            <div className="flex items-center">
              <SVGArrowLeft className="h-5 w-5" />
              <p className="ml-2">Back to Home</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
