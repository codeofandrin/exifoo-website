"use client"

import { useEffect, useState } from "react"

import Button from "@/components/common/Button"
import SVGApple from "@/assets/icons/Apple.svg"

interface DynamicButtonPropsType {
  downloadURLMacOS: { arm64: string; x64: string }
}

export default function DynamicButton({ downloadURLMacOS }: DynamicButtonPropsType) {
  const [downloadLink, setDownloadLink] = useState<string | undefined>(downloadURLMacOS.x64)
  const [isNotReliable, setIsNotReliable] = useState(false)

  useEffect(() => {
    const x64Match = navigator.userAgent.match(/OS X 10_([789]|1[01234])/)

    if (x64Match === null) {
      // if it's >= 10.15 it could be x64 or arm64 -> further checks are necessary
      // Reference: https://stackoverflow.com/a/65412357/13508045
      var w = document.createElement("canvas").getContext("webgl") as WebGLRenderingContext
      var d = w.getExtension("WEBGL_debug_renderer_info")
      var g = (d && w.getParameter(d.UNMASKED_RENDERER_WEBGL)) || ""
      if (g.match(/Apple/)) {
        console.log("apple match")
        if (g.match(/Apple GPU/)) {
          console.log("apple gpu match")
          // Safari
          // cannot reliable detect arch, let's keep x64
          setIsNotReliable(true)
        } else {
          setDownloadLink(downloadURLMacOS.arm64)
        }
      }
    }
  }, [])

  return (
    <Button className="w-full sm:w-fit" color="primary" size="xl" href={downloadLink}>
      <div className="flex items-center">
        <SVGApple className="h-6 w-6" />
        {isNotReliable ? (
          <p className="ml-2">Download for macOS (Intel Chip)</p>
        ) : (
          <p className="ml-2">Download for macOS</p>
        )}
      </div>
    </Button>
  )
}
