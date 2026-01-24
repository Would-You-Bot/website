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
        <h3 className="text-lg font-bold text-foreground">
          Sole proprietorship
        </h3>
        <p className="select-none">Dominik Koch</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">Contact</h3>
        <p className="select-none">
          Dominik Koch
					<br />
					c/o IP-Management #8532
					<br />
					Ludwig-Erhard-Str. 18
					<br />
					20459 Hamburg
					<br />
          Germany
        </p>
      </div>
      <p>No acceptance of parcels or packages.</p>
      <p className="select-none">Email: dominik@wouldyoubot.com</p>
      <p className="select-none">Phone: +49 151 23793107</p>
      <div>
        <h3 className="text-lg font-bold text-foreground">Privacy Policy</h3>
        <Link
          href="https://wouldyoubot.gg/privacy/"
          className="text-foreground underline"
        >
          https://wouldyoubot.gg/privacy/
        </Link>
      </div>
    </main>
  )
}
