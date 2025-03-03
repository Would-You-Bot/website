import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  title: 'Legal Notice - Would You Bot',
  alternates: {
    languages: {
      de: 'https://wouldyoubot.gg/legal-de'
    }
  },
  description: 'The legal notice of Would You Bot.',
  twitter: {
    title: 'Legal Notice - Would You Bot',
    description: 'The legal notice of Would You Bot.'
  },
  openGraph: {
    title: 'Legal Notice - Would You Bot',
    description: 'The legal notice of Would You Bot.'
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

export default function legalnotice() {
  return (
    <main className="flex mx-auto w-full max-w-8xl flex-col gap-8 px-8 text-foreground/70">
      <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
        Legal Notice
      </h1>
      <p>
        <span
          className="mr-1.5 text-lg"
          aria-label="German flag"
        >
          🇩🇪
        </span>
        For the German version please visit{' '}
        <Link
          href="/legal-de"
          className="text-foreground underline"
        >
          this page
        </Link>
        .
      </p>
      <p>Information according to § 5 TMG.</p>
      <div>
        <h3 className="text-lg font-bold text-foreground">Sole proprietorship</h3>
        <p className="select-none">
          Dominik Koch
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">Contact</h3>
        <p className="select-none">
          Dominik Koch
          <br />
          Parkstraße 5
          <br />
          88499 Riedlingen
          <br />
          Germany
        </p>
      </div>
      <p>No acceptance of parcels or packages.</p>
      <p className="select-none">Email: dominik@wouldyoubot.com</p>
      <p className="select-none">Phone: +49 151 23793107</p>
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Online dispute resolution
        </h3>
        <p>
          The European Comission provides a platform for online dispute
          resolution, available at{' '}
          <Link
            href="https://ec.europa.eu/consumers/odr/"
            className="text-foreground underline"
          >
            https://ec.europa.eu/consumers/odr/
          </Link>
          . <br />I am neither willing nor obliged to participate in dispute
          resolution proceedings in front of a consumer arbitration board.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">Privacy Policy</h3>
        <Link
          href="https://wouldyoubot.gg/privacy/"
          className="text-foreground underline"
        >
          https://wouldyoubot.gg/privacy/
        </Link>
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Validity of this Legal Notice
        </h3>
        <p>
          This legal notice is valid for the following websites, social media
          accounts and other services, as long as they are listed below.
        </p>
      </div>
      <div className="text-foreground">
        <br />
        <Link
          href="https://wouldyoubot.gg/"
          className="underline"
        >
          https://wouldyoubot.gg/
        </Link>
        <br />

        <Link
          href="https://rivo.gg/"
          className="underline"
        >
          https://rivo.gg/
        </Link>
        <br />
        <Link
          href="https://twitter.com/WouldYouBot/"
          className="underline"
        >
          https://twitter.com/WouldYouBot/
        </Link>
      </div>
      <p>
        The Discord bot with the id{' '}
        <span className="font-mono text-foreground">981649513427111957</span>
        <br />
        The Discord server with the id{' '}
        <span className="font-mono text-foreground">1009562516105461780</span>
      </p>
    </main>
  )
}
