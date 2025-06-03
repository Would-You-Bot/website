import { HomeSchemaMetadata } from '@/components/Homepage/SchemaMetadata'
import { getRandomQuestion } from '@/helpers/getRandomQuestion'
import { HomeContent } from '@/components/Homepage/Content'
import FeaturedServer from '@/types/FeaturedServer'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  title: 'Would You - The Discord Bot',
  description:
    'Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!',
  robots: 'index, follow',
  publisher: 'Rivo',
  openGraph: {
    title: 'Would You - The Discord Bot',
    images: 'https://wouldyoubot.gg/showcase.png',
    description:
      'Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!',
    type: 'website',
    url: 'https://wouldyoubot.gg',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Would You - The Discord Bot',
    images: 'https://wouldyoubot.gg/showcase.png',
    description:
      'Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!',
    site: '@WouldYouBot'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/favicon-16x16.png'
  }
}

export const viewport: Viewport = {
  themeColor: '#0598F6',
  maximumScale: 5
}

const Home = async () => {
  const response = await fetch(
    'https://japi.rest/discord/v1/application/981649513427111957/',
    {
      next: {
        revalidate: 60
      }
    }
  )

  const data = await response.json()
  const serverCount = data.data.bot.approximate_guild_count ?? 0

  const serverResponse = await fetch(
    'https://liberal-snail-47202.upstash.io/get/server_count',
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.UPSTASH_API_KEY
      }
    }
  )

  const serverData = await serverResponse.json()
  const servers = JSON.parse(serverData.result ?? null) ?? []

  return (
    <>
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <HomeContent
          initialRatherQuestion={getRandomQuestion('rather')}
          initialNhieQuestion={getRandomQuestion('nhie')}
          serverCount={serverCount}
          servers={servers.filter((n: FeaturedServer) => n.name !== 'Pornhub')}
        />
      </main>
      <HomeSchemaMetadata />
    </>
  )
}

export default Home
