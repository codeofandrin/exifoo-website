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
    <div className="mt-28 flex w-full flex-col items-center px-7 sm:mt-72 sm:max-w-screen-xl">
      {/* CTA */}
      <div className="flex w-full justify-center sm:justify-start">
        <div className="ml-32 flex flex-col sm:ml-0 sm:flex-row">
          <p className="ml-3 font-marker text-xl text-neutral-800 sm:text-3xl">TRY IT OUT</p>
          <Image
            src={ImgArrowMarker}
            alt="arrow marker"
            className="mt-2 w-10 -rotate-[160deg] sm:ml-4 sm:mt-4 sm:w-12 sm:rotate-[120deg] md:ml-8 md:mt-0 md:w-16 md:rotate-[100deg]"
          />
        </div>
      </div>
      {/* Toggle Switch */}
      <div className="relative mt-8 w-full sm:mt-0">
        <div className="flex flex-col items-center">
          <p className="text-neutral-700">
            Turn on <span className="font-logo text-lg font-bold text-logo sm:text-xl">exifoo</span>
          </p>
          <div className="mt-2 sm:hidden">
            <ToggleSwitch handleToggle={() => setIsToggleOn(!isToggleOn)} />
          </div>
          <div className="mt-2 hidden sm:block">
            <ToggleSwitch size="lg" handleToggle={() => setIsToggleOn(!isToggleOn)} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col lg:relative lg:w-full lg:items-center">
        {/* Images */}
        <div>
          {isToggleOn ? (
            <Image src={ImgAppFilenamesAfter} alt="app_filenames_after" className="sm:w-fit" />
          ) : (
            <Image src={ImgAppFilenamesBefore} alt="app_filenames_before" className="sm:w-fit" />
          )}
        </div>
        {/* Description */}
        <div className="flex flex-col items-center text-center text-xl font-medium text-neutral-800 sm:text-2xl lg:absolute lg:right-0 lg:top-1/2 lg:max-w-60 lg:-translate-y-1/2 lg:transform lg:text-left">
          <p>Turn a choatic folder ...</p>
          <AnimatePresence>
            {isToggleOn ? (
              <motion.p
                className="mt-2 sm:mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                ... into a perfectly sorted photo collection
              </motion.p>
            ) : (
              // placeholder
              <p className="mt-2 opacity-0 sm:mt-5">... into a perfectly sorted photo collection</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
