import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SmoothScroll from "@/components/SmoothScroll"
import "./globals.css"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SmoothScroll>
      <html lang="en">
        <body className="flex flex-col items-center">
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </SmoothScroll>
  )
}
