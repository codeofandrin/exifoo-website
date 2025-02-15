"use client"

import Image from "next/image"

import Button from "@/components/common/Button"
import { EMail } from "@/utils/constants"
import ImgErrorIllus from "@/assets/images/error_illus.png"
import SVGRotateCCW from "@/assets/icons/RotateCCW.svg"

interface ErrorPropsType {
  reset: React.MouseEventHandler<HTMLButtonElement>
}

export default function Error({ reset }: ErrorPropsType) {
  return (
    <div className="flex h-screen w-full flex-col items-center px-7">
      <div className="h-1/2 justify-start">
        <div className="flex h-full flex-col justify-end">
          <Image src={ImgErrorIllus} alt={ImgErrorIllus.src} className="w-60 select-none sm:w-96" />
        </div>
      </div>
      <div className="shrink-0">
        <h1 className="mt-4 text-center font-logo text-4xl font-semibold tracking-tight text-neutral-800 sm:mt-6 sm:text-6xl">
          Something went wrong
        </h1>
        <div className="mt-6 text-center font-medium text-neutral-500 sm:mt-8 sm:text-lg">
          <p>Whoops! Something unexpected happened.</p>
          <p>Please try again or contact support if the problem persists.</p>
        </div>
      </div>
      <div className="h-1/2 justify-end">
        <div className="mt-8 flex w-full flex-col justify-center sm:mt-14 sm:flex-row">
          <Button color="accent" className="mt-3 w-full sm:mt-0 sm:w-40" href={`mailto:${EMail.help}`}>
            <div className="flex items-center">
              <p className="ml-2">Contact Support</p>
            </div>
          </Button>
          <Button color="primary" className="mt-3 w-full sm:ml-5 sm:mt-0 sm:w-40" onClick={reset}>
            <div className="flex items-center">
              <SVGRotateCCW className="h-4 w-4" />
              <p className="ml-2">Try again</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
