import { PlausibleScript } from '@/components/plausible-script'
import { CookieProvider } from '@/components/cookies'
import { IdTokenJWT } from '@/helpers/oauth/types'
import { getIdToken } from '@/helpers/oauth'
import { ThemeProvider } from 'next-themes'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import Alert from '@/components/Alert'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const idToken = getIdToken()

	return (
		<html lang="en">
			<body className={inter.className}>
				<PlausibleScript />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<CookieProvider>
						<Alert
							href="/premium"
							className="bg-brand-primary text-white"
							active
						>
							<b>Would You Bot</b> • Upgrade your server with Premium
						</Alert>
						<div className="w-full relative min-h-dvh flex flex-col">
							<Navbar idToken={idToken as unknown as IdTokenJWT} />
							{children}
							<Footer />
						</div>
					</CookieProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
