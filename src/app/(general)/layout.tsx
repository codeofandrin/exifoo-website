import type { Metadata } from "next"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "../globals.css"

export const metadata: Metadata = {
  title: "exifoo - Shoot more. Organize less.",
  description:
    "exifoo helps you keep your photos organized by adding the date and time of capture to the filename."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col items-center">
        <Navbar />
        <div className="mt-24 w-full">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
