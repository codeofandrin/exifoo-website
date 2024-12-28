"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import ToggleSwitch from "../common/ToggleSwitch"
import ImgArrowMarker from "@/assets/images/arrow_marker.png"
import ImgAppFilenamesBefore from "@/assets/images/app_filenames_before.png"
import ImgAppFilenamesAfter from "@/assets/images/app_filenames_after.png"

export default function Preview() {
  const [isToggleOn, setIsToggleOn] = useState(false)

  return (
    <div className="mt-32 flex flex-col items-center px-7">
      {/* Toggle Switch */}
      <div className="relative w-full">
        <div className="flex flex-col items-center">
          <p className="text-neutral-700">
            Turn on <span className="font-logo text-lg font-bold text-logo">exifoo</span>
          </p>
          <div className="mt-2">
            <ToggleSwitch handleToggle={() => setIsToggleOn(!isToggleOn)} />
          </div>
        </div>
        {/* CTA */}
        <div className="absolute bottom-0 right-0 mb-2 flex">
          <Image src={ImgArrowMarker} alt="arrow marker" className="w-6 -rotate-[100deg]" />
          <p className="ml-2 font-marker text-xs text-neutral-800">TRY IT OUT</p>
        </div>
      </div>
      {/* Images */}
      <div className="mt-3">
        {isToggleOn ? (
          <Image src={ImgAppFilenamesAfter} alt="app_filenames_after" />
        ) : (
          <Image src={ImgAppFilenamesBefore} alt="app_filenames_before" />
        )}
      </div>
      {/* Description */}
      <div className="flex flex-col items-center text-center text-xl font-medium text-neutral-800">
        <p>Turn a choatic folder ...</p>
        <AnimatePresence>
          {isToggleOn ? (
            <motion.p
              className="mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              ... into a perfectly sorted photo collection
            </motion.p>
          ) : (
            // placeholder
            <p className="mt-2 opacity-0">... into a perfectly sorted photo collection</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
