import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@next/third-parties/google"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "../globals.css"

export const metadata: Metadata = {
  title: "exifoo - Rename photos based on capture date and time from EXIF data",
  description:
    "exifoo helps you keep your photos organized by adding the date and time from EXIF data to the filename."
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
        <GoogleAnalytics gaId="AW-16876918424" />
        <SpeedInsights />
      </body>
    </html>
  )
}
