import Image from "next/image"
import Link from "next/link"

import { EMail } from "@/utils/constants"
import ImgLogoLarge from "@/assets/images/exifoo_logo_large.png"

interface LinksPropsType {
  title: string
  items: { text: string; link: string }[]
  first?: boolean
}

function Links({ title, items, first = false }: LinksPropsType) {
  return (
    <div>
      <h1 className="font-semibold text-neutral-700">{title}</h1>
      <div className="mt-6 flex flex-col">
        {items.map(({ text, link }, i) => (
          <Link
            key={`footer-${title}-item-${i}`}
            href={link}
            className={`${i !== 0 && "mt-4"} text-neutral-500`}>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <div className="mt-40 w-full px-7 pb-20">
      <div className="flex flex-col">
        {/* Logo */}
        <Link href="/" className="group">
          <Image
            src={ImgLogoLarge}
            alt={ImgLogoLarge.src}
            className="h-12 w-fit transition-[opacity] duration-200 group-hover:opacity-70"
          />
        </Link>
        {/* Copyright */}
        <div className="mt-5 text-sm text-neutral-400">
          <p>Copyright © 2024 exifoo</p>
          <p>All rights reserved.</p>
        </div>
      </div>
      {/* Links */}
      <div className="mt-14 grid grid-cols-2">
        {/* Product */}
        <Links
          title="Product"
          items={[
            { text: "Download", link: "/download" },
            { text: "Features", link: "/#features" },
            { text: "Changelog", link: "/changelog" },
            { text: "Pricing", link: "/#pricing" },
            { text: "Feedback", link: `mailto:${EMail.feedback}` },
            { text: "Support", link: `mailto:${EMail.help}` }
          ]}
        />
        {/* Legal */}
        <Links title="Legal" items={[{ text: "Imprint", link: "/imprint" }]} />
      </div>
    </div>
  )
}
