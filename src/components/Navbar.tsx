"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import ImgLogoLarge from "@/assets/images/exifoo_logo_large.png"
import SVGMenu from "@/assets/icons/Menu.svg"

const menuItems = [
  { name: "Download", link: "/download", highlight: true },
  { name: "Features", link: "/#features", highlight: false },
  { name: "Changelog", link: "/changelog", highlight: true },
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
    <div className="absolute w-full">
      <ul className="mt-4 flex flex-col rounded-lg bg-logo p-4 font-medium">
        {menuItems.map(({ name, link, highlight }, i) => {
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

  function handleToggleMenu() {
    setIsToggleOpen(!isToggleOpen)
  }

  return (
    <div className="flex flex-col px-7">
      <div className="flex items-center justify-between pt-10">
        <a href="/">
          <img src={ImgLogoLarge.src} alt="exifoo Logo" className="w-40" />
        </a>
        <button className="sm:hidden" onClick={handleToggleMenu}>
          <SVGMenu className="w-7 text-logo" />
        </button>
      </div>
      <div className="relative sm:hidden">
        {isToggleOpen && <MobileMenu currentPath={currentPath} closeMenu={() => setIsToggleOpen(false)} />}
      </div>
    </div>
  )
}
