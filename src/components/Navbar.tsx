"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { useScrollPosition } from "@/hooks/useScrollPosition"
import ImgLogoLarge from "@/assets/images/exifoo_logo_large.png"
import SVGMenu from "@/assets/icons/Menu.svg"
import SVGX from "@/assets/icons/X.svg"

const menuItems = [
  { name: "Download", link: "/download", highlight: true },
  { name: "Features", link: "/#features", highlight: false },
  { name: "Release Notes", link: "/release-notes", highlight: true },
  { name: "Pricing", link: "/#pricing", highlight: false }
]

interface MobileMenuPropsType {
  currentPath: string
  closeMenu: Function
}

function MobileMenu({ currentPath, closeMenu }: MobileMenuPropsType) {
  function handleCloseMenu() {
    closeMenu()
  }

  return (
    <div className="absolute z-[99] w-full">
      <ul className="mt-4 flex flex-col rounded-lg bg-logo p-4 font-medium shadow-xl">
        {menuItems.map(({ name, link, highlight }) => {
          const currentHighlight = highlight && currentPath === link

          return (
            <li key={`menu-item-${name}`}>
              <Link
                href={link}
                className={`${currentHighlight ? "text-primary-400" : "text-primary-50"} block rounded-lg px-3 py-2 hover:bg-black/20`}
                onClick={handleCloseMenu}>
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const currentPath = usePathname()
  const scrollPosition = useScrollPosition()

  function handleToggleMenu() {
    setIsToggleOpen(!isToggleOpen)
  }

  return (
    <div
      className={`fixed top-0 z-[99] w-full ${scrollPosition > 20 ? "shadow-md" : "shadow-none"} flex justify-center bg-white/70 backdrop-blur-xl transition-shadow duration-300`}>
      <div className="flex w-full flex-col px-7 sm:max-w-screen-xl">
        <div
          className={`flex items-center justify-between ${scrollPosition > 20 ? "py-7 sm:py-5" : "py-7 sm:py-10"} transition-[padding] duration-300`}>
          <Link href="/" className="group">
            <Image
              src={ImgLogoLarge}
              alt={ImgLogoLarge.src}
              className="w-40 select-none transition-[opacity] duration-200 group-hover:opacity-60"
              sizes="(max-width: 640px) 500px, 2257px"
            />
          </Link>
          <div className="hidden space-x-8 sm:block">
            {menuItems.map(({ name, link, highlight }) => {
              const currentHighlight = highlight && currentPath === link
              return (
                <Link
                  key={`menu-item-${name}`}
                  href={link}
                  className={`${currentHighlight ? "text-primary-400" : "text-logo"} transition-[opacity] duration-200 hover:opacity-60`}>
                  {name}
                </Link>
              )
            })}
          </div>
          {/* Mobile Menu Button */}
          <button
            aria-label={`${isToggleOpen ? "Close Navigation Menu" : "Open Navigation Menu"}`}
            className="sm:hidden"
            onClick={handleToggleMenu}>
            {isToggleOpen ? <SVGX className="w-7 text-logo" /> : <SVGMenu className="w-7 text-logo" />}
          </button>
        </div>
        {/* Mobile Menu */}
        <div className="relative sm:hidden">
          {isToggleOpen && <MobileMenu currentPath={currentPath} closeMenu={() => setIsToggleOpen(false)} />}
        </div>
      </div>
    </div>
  )
}
