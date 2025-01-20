import type { Metadata } from "next"

import "../globals.css"

export const metadata: Metadata = {
  title: "Page not found - exifoo"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
