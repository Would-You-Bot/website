import Content from '@/components/Premium/Content'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL('https://wouldyoubot.gg'),
	title: 'Premium - Would You Bot',
	description: 'Get premium for Would You Bot and unlock all features!',
	twitter: {
		title: 'Premium - Would You Bot',
		description: 'Get premium for Would You Bot and unlock all features!'
	},
	openGraph: {
		title: 'Premium - Would You Bot',
		description: 'Get premium for Would You Bot and unlock all features!'
	},
	robots: {
		index: true,
		follow: true
	}
}

export const viewport: Viewport = {
	themeColor: '#facc15',
	maximumScale: 5
}

export default function Premium() {
	return (
		<>
			<main className="relative mb-40 flex w-full justify-centermx-auto max-w-8xl px-8">
				<Content />
			</main>
		</>
	)
}
