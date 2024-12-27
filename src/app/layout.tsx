import Header from "@/components/Header"
import "./globals.css"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="px-7">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
