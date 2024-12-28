"use client"

import { useState } from "react"

import ImgLogoLarge from "@/assets/images/exifoo_logo_large.png"
import SVGMenu from "@/assets/icons/Menu.svg"

const menuItems = [
  { name: "Download", link: "/download" },
  { name: "Features", link: "/#features" },
  { name: "Changelog", link: "/changelog" },
  { name: "Pricing", link: "/#pricing" }
]

function MobileMenu() {
  return (
    <div className="absolute w-full">
      <ul className="mt-4 flex flex-col rounded-lg bg-logo p-4 font-medium">
        {menuItems.map(({ name, link }, i) => {
          return (
            <li key={`menu-item-${name}`}>
              <a href={link} className="block rounded-lg px-3 py-2 text-primary-50 hover:bg-black/20">
                {name}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  function handleToggleMenu() {
    setIsToggleOpen(!isToggleOpen)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pt-10">
        <a href="/">
          <img src={ImgLogoLarge.src} alt="exifoo Logo" className="w-40" />
        </a>
        <button className="sm:hidden" onClick={handleToggleMenu}>
          <SVGMenu className="w-7 text-logo" />
        </button>
      </div>
      <div className="relative sm:hidden">{isToggleOpen && <MobileMenu />}</div>
    </div>
  )
}
