"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

import SVGStar from "@/assets/icons/Star.svg"

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
        className={`${className} ${!first && "mt-16"} relative w-full overflow-hidden rounded-xl border border-accent-800 p-6 shadow-xl sm:hidden`}>
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
        transition={{ type: "spring", bounce: 0.6 }}
        className={`${className} relative hidden min-h-[22rem] max-w-sm overflow-hidden rounded-xl border border-accent-800 p-8 transition-shadow duration-200 sm:flex sm:hover:shadow-xl`}>
        <div
          className="pointer-events-none absolute -inset-px -z-50 opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(207,247,254,1), transparent 50%)`
          }}
        />
        <div className="flex flex-col justify-between">{children}</div>
      </motion.div>
    </div>
  )
}

interface CardReviewPropsType {
  children: string | React.ReactElement
}

function CardReview({ children }: CardReviewPropsType) {
  let stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <SVGStar key={`testimonial-star-${i}`} className={`${i !== 0 && "ml-1"} w-5 fill-yellow-500`} />
    )
  }

  return (
    <div className="flex flex-col">
      <p className="mt-2 text-neutral-600">{children}</p>
      <div className="mt-3 flex">
        {stars.map((star) => {
          return star
        })}
      </div>
    </div>
  )
}

interface CardAuthorPropsType {
  imgClass: string
  name: string
  profession: string
}

function CardAuthor({ imgClass, name, profession }: CardAuthorPropsType) {
  return (
    <div className="mt-7 flex items-center">
      {/* Portrait */}
      <div className={`${imgClass} h-12 w-12 rounded-full bg-cover bg-center`}></div>
      {/* Text */}
      <div className="ml-3 flex flex-col">
        <p className="font-semibold text-neutral-700">{name}</p>
        <p className="text-sm text-neutral-600">{profession}</p>
        <p></p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <div className="mt-40 px-7 pb-40 md:px-10 lg:px-20">
      {/* Header */}
      <h1 className="text-center text-3xl font-semibold text-neutral-800 sm:text-4xl">What our users say</h1>
      {/* Description */}
      <p className="mt-3 text-center text-neutral-600 sm:mt-5 sm:text-lg">
        Read how <span className="font-logo font-bold text-logo">exifoo</span> has made organizing photos
        easier for people just like you.
      </p>
      {/* Cards */}
      <div className="mt-16 sm:mt-28 sm:flex sm:flex-wrap sm:items-start sm:justify-center sm:gap-10 lg:flex-nowrap">
        {/* Author 1 */}
        <Card className="bg-gradient-to-b from-white to-accent-100 sm:bg-none" first>
          <CardReview>
            <>
              I can't recommend <span className="font-logo font-medium text-logo">exifoo</span> enough! It's
              been a game changer for organizing my photos, making them easy to recognize. I also appreciate
              its commitment to privacy, it keeps my photos organized and my data safe.
            </>
          </CardReview>
          <CardAuthor
            imgClass="bg-[url('../assets/images/testimonial_author_1.jpg')]"
            name="James Carter"
            profession="Artist"
          />
        </Card>
        {/* Author 2 */}
        <Card className="bg-accent-100 sm:bg-transparent">
          <CardReview>
            <>
              I spent hours sorting through my photos, struggling to remember when and where they were taken.
              It was exhausting. But with <span className="font-logo font-medium text-logo">exifoo</span>,
              everything is so much easier. And the best thing about it is that I only had to pay once.
            </>
          </CardReview>
          <CardAuthor
            imgClass="bg-[url('../assets/images/testimonial_author_2.jpg')]"
            name="Sophie Martin"
            profession="Traveller"
          />
        </Card>
        {/* Author 3 */}
        <Card className="bg-gradient-to-t from-white to-accent-100 sm:bg-none">
          <CardReview>
            <>
              I love how easy <span className="font-logo font-medium text-logo">exifoo</span> is to use.
              There's no sign-up needed, so I could get started right away. The interface is super simple and
              makes renaming photos so easy. It's the perfect tool for anyone seeking a quick and easy
              solution!
            </>
          </CardReview>
          <CardAuthor
            imgClass="bg-[url('../assets/images/testimonial_author_3.jpg')]"
            name="Claudia Fischer"
            profession="Photographer"
          />
        </Card>
      </div>
    </div>
  )
}
