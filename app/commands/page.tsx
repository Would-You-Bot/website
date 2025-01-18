import Content from '@/components/Commands/Content'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL('https://wouldyoubot.gg'),
	title: 'Commands - Would You Bot',
	description: 'All the commands Would You Bot has to offer!',
	twitter: {
		title: 'Commands - Would You Bot',
		description: 'All the commands Would You Bot has to offer!'
	},
	openGraph: {
		title: 'Commands - Would You Bot',
		description: 'All the commands Would You Bot has to offer!'
	},
	robots: {
		index: true,
		follow: true
	}
}

export const viewport: Viewport = {
	themeColor: '#0598F6',
	maximumScale: 5
}

export default function Commands() {
	return (
		<>
			<main className="w-full mx-auto max-w-8xl px-8">
				<Content />
			</main>
		</>
	)
}
