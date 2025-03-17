import Image from "next/image"
import Link from "next/link"

import { EMail } from "@/utils/constants"
import ImgLogoLarge from "@/assets/images/exifoo_logo_large.png"

const productItems = [
  { text: "Download", link: "/download" },
  { text: "Features", link: "/#features" },
  { text: "Release Notes", link: "/release-notes" },
  { text: "Pricing", link: "/#pricing" },
  { text: "Feedback", link: `mailto:${EMail.feedback}` },
  { text: "Support", link: `mailto:${EMail.help}` }
]

const legalItems = [
  { text: "Legal Notice", link: "/legal" },
  { text: "Privacy Policy", link: "/privacy" }
]

interface LinksPropsType {
  title: string
  items: { text: string; link: string }[]
}

function Links({ title, items }: LinksPropsType) {
  return (
    <div>
      <h1 className="font-semibold text-neutral-700">{title}</h1>
      <div className="mt-6 flex w-fit flex-col">
        {items.map(({ text, link }, i) => (
          <Link
            key={`footer-${title}-item-${i}`}
            href={link}
            className={`${i !== 0 && "mt-4 sm:mt-5"} text-neutral-500 transition-[opacity] duration-200 hover:opacity-60`}>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <div className="mt-40 flex w-full flex-col px-7 pb-20 sm:max-w-screen-xl sm:flex-row sm:items-center">
      <div className="flex w-fit flex-col sm:w-1/2 sm:justify-start">
        <div className="w-fit">
          {/* Logo */}
          <Link href="/" className="group">
            <Image
              src={ImgLogoLarge}
              alt={ImgLogoLarge.src}
              className="h-12 w-fit select-none transition-[opacity] duration-200 group-hover:opacity-60"
              sizes="(max-width: 640px) 500px, 2257px"
            />
          </Link>
          {/* Copyright */}
          <div className="mt-5 text-sm text-neutral-400">
            <p>Copyright © 2025 exifoo</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
      {/* Links */}
      <div className="mt-14 grid grid-cols-2 sm:w-1/2 sm:justify-end">
        {/* Product */}
        <Links title="Product" items={productItems} />
        {/* Legal */}
        <Links title="Legal" items={legalItems} />
      </div>
    </div>
  )
}
