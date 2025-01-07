"use client"

import { useEffect, useState } from "react"

import Button from "@/components/common/Button"
import SVGApple from "@/assets/icons/Apple.svg"

interface DynamicButtonPropsType {
  downloadURLMacOS: { arm64: string; x64: string }
}

export default function DynamicButton({ downloadURLMacOS }: DynamicButtonPropsType) {
  const [downloadLink, setDownloadLink] = useState<string | undefined>()

  useEffect(() => {
    const x64Match = navigator.userAgent.match(/OS X 10_([789]|1[01234])/)
    if (x64Match === null) {
      setDownloadLink(downloadURLMacOS.arm64)
    } else {
      setDownloadLink(downloadURLMacOS.x64)
    }
  }, [])

  return (
    <Button className="w-full sm:w-fit" color="primary" size="xl" href={downloadLink}>
      <div className="flex items-center">
        <SVGApple className="h-6 w-6" />
        <p className="ml-2">Download for macOS</p>
      </div>
    </Button>
  )
}
