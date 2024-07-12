import { HomeContent } from "@/components/Homepage/Content"
import { HomeSchemaMetadata } from "@/components/Homepage/SchemaMetadata"
import { getRandomQuestion } from "@/helpers/getRandomQuestion"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Would You - The Discord Bot",
  description:
    "Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
  robots: "index, follow",
  publisher: "Rivo",
  metadataBase: new URL("https://wouldyoubot.gg"),
  openGraph: {
    title: "Would You - The Discord Bot",
    description:
      "Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
    type: "website",
    url: "https://wouldyoubot.gg",
    images: "https://i.imgur.com/BsWSxze.png"
  },
  twitter: {
    card: "summary_large_image",
    images: "https://i.imgur.com/BsWSxze.png",
    title: "Would You - The Discord Bot",
    description:
      "Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
    site: "@WouldYouBot"
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon-16x16.png"
  }
}

export const viewport: Viewport = {
  themeColor: "#0598F6"
}

const Home = async () => {
  const response = await fetch(
    "https://japi.rest/discord/v1/application/981649513427111957/"
  )

  const data = await response.json()
  const serverCount = data.data.bot.approximate_guild_count ?? 0

  const serverResponse = await fetch(
    "https://liberal-snail-47202.upstash.io/get/server_count",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.UPSTASH_API_KEY
      }
    }
  )

  const serverData = await serverResponse.json()

  return (
    <>
      <main className="flex w-full flex-col items-center overflow-x-hidden text-neutral-300">
        <HomeContent
          initialQuestion={getRandomQuestion()}
          serverCount={serverCount}
          servers={JSON.parse(serverData.result).filter(
            (g: any) => g.name !== "Pornhub"
          )}
        />
      </main>
      <HomeSchemaMetadata />
    </>
  )
}

export default Home
