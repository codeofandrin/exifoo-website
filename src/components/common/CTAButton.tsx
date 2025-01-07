"use client"

import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

import SVGArrowRight from "@/assets/icons/ArrowRight.svg"
import "@/styles/root/CTAButton.css"

interface CTAButtonPropsType extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: string
  href?: string | null
  target?: string | null
}

export default function CTAButton({ children, href = null, target = null, ...props }: CTAButtonPropsType) {
  function handleHrefClick() {
    if (href !== null) {
      if (target !== null) {
        window.open(href, target)
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", bounce: 0.6 }}
      onClick={handleHrefClick}
      {...props}
      className={`${props.className} btn-cta group relative overflow-hidden rounded-full bg-gradient-to-t from-primary-600 to-primary-500 px-7 py-3.5`}>
      <div className="flex items-center justify-center">
        <p className="font-bold text-white">{children}</p>
        <SVGArrowRight className="ml-2 w-6 text-white transition-[transform] duration-300 group-hover:translate-x-2" />
      </div>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </motion.button>
  )
}
