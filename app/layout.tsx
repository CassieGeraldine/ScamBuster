import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import "./globals.css"

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "CyberGuard Learning Platform",
  description: "Gamified multilingual cybersecurity learning platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <LanguageProvider>
          <Suspense fallback={null}>
            <div className="pb-20">{children}</div>
            <BottomNavigation />
          </Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
