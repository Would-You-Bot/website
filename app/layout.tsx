import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getIdToken } from "@/helpers/oauth"
import { Inter } from "next/font/google"
import React from "react"
import "./globals.css"
import Alert from "@/components/Alert"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const idToken = getIdToken()

  return (
    <html lang="en">
      <script
        async
        data-domain="wouldyoubot.gg"
        src="https://stats.wouldyoubot.gg/js/script.js"
      ></script>
      <body className={inter.className}>
        <Alert
          href="/premium"
          className="bg-brand-customPrimary text-white"
          active
        >
          <b>Would You Bot</b> • Upgrade your server with Premium
        </Alert>
        <div className="w-full relative">
          <Navbar idToken={idToken} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
