"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

import SVGShield from "@/assets/icons/Shield.svg"
import SVGNoPerson from "@/assets/icons/NoPerson.svg"
import SVGCheck from "@/assets/icons/Check.svg"

interface CardPropsType {
  className: string
  first?: boolean
  children: React.ReactElement[] | React.ReactElement
}

function Card({ className, first = false, children }: CardPropsType) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div>
      {/* Mobile card */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${className} ${!first && "mt-16"} relative w-full overflow-hidden rounded-3xl border border-accent-800 p-6 shadow-xl sm:hidden`}>
        {children}
      </div>
      {/* Desktop Card */}
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5, delay: 0, type: "spring" }}
        className={`${className} relative hidden w-[420px] overflow-hidden rounded-3xl border border-accent-800 p-10 transition-shadow duration-200 sm:block sm:hover:shadow-xl`}>
        <div
          className="pointer-events-none absolute -inset-px -z-50 opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(207,247,254,1), transparent 50%)`
          }}
        />
        <div>{children}</div>
      </motion.div>
    </div>
  )
}

interface CardIconPropsType {
  children: React.ReactElement
}

function CardIcon({ children }: CardIconPropsType) {
  return <div className="w-fit rounded-xl bg-accent-800 px-3 py-2">{children}</div>
}

interface CardTitlePropsType {
  children: string
}

function CardTitle({ children }: CardTitlePropsType) {
  return <h1 className="mt-3 text-xl font-semibold text-neutral-700 sm:mt-7 sm:text-2xl">{children}</h1>
}

interface CardDescriptionPropsType {
  children: string
}

function CardDescription({ children }: CardDescriptionPropsType) {
  return <p className="mt-2 text-neutral-600 sm:mt-3 sm:text-lg">{children}</p>
}

export default function Benefits() {
  return (
    <div className="mt-20 flex w-full flex-col items-center px-7 sm:max-w-screen-xl">
      {/* Heading */}
      <h1 className="text-center text-3xl font-semibold text-neutral-800 sm:text-4xl">
        <p className="flex flex-col sm:block">
          Our tool. <span className="font-bold text-accent-500">Your experience.</span>
        </p>
      </h1>
      {/* Description */}
      <p className="mt-3 text-center text-neutral-600 sm:mt-5 sm:text-lg">
        Why we believe our tool meets today's requirements.
      </p>
      {/* Cards */}
      <div className="mt-16 w-full sm:mt-28 sm:flex sm:flex-wrap sm:justify-center sm:gap-16">
        {/* Privacy */}
        <Card className="bg-gradient-to-b from-white to-accent-100 sm:bg-none" first>
          <CardIcon>
            <SVGShield className="w-8 fill-white sm:w-10" />
          </CardIcon>
          <CardTitle>Privacy first.</CardTitle>
          <CardDescription>
            Our tool processes all your photos offline directly on your device, so you never have to let them
            out of your hands. Isn't that great?
          </CardDescription>
        </Card>
        {/* No Registration */}
        <Card className="bg-accent-100 sm:bg-transparent">
          <CardIcon>
            <SVGNoPerson className="w-8 fill-white sm:w-10" />
          </CardIcon>
          <CardTitle>No Registration.</CardTitle>
          <CardDescription>
            Our tool does not require you to sign up for an account, newsletter or anything else. Start using
            it right ahead.
          </CardDescription>
        </Card>
        {/* Simple */}
        <Card className="bg-gradient-to-t from-white to-accent-100 sm:bg-none">
          <CardIcon>
            <SVGCheck className="w-8 text-white sm:w-10" />
          </CardIcon>
          <CardTitle>Simple and Modern.</CardTitle>
          <CardDescription>
            Our tool makes photo renaming quick and easy with a clean, modern interface — no technical
            knowledge required.
          </CardDescription>
        </Card>
      </div>
    </div>
  )
}
