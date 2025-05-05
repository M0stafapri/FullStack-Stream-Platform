import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "@/app/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Innovati - The Art of Visual Storytelling",
  description: "A modern video streaming platform for visual storytellers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
