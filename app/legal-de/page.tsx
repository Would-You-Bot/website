import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  title: 'Impressum - Would You Bot',
  alternates: {
    canonical: '/legal'
  },
  description: 'Das Impressum von Would You Bot.',
  twitter: {
    title: 'Impressum - Would You Bot',
    description: 'Das Impressum von Would You Bot.'
  },
  openGraph: {
    title: 'Impressum - Would You Bot',
    description: 'Das Impressum von Would You Bot.'
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

export default function legalnoticede() {
  return (
    <main className="flex mx-auto w-full max-w-8xl flex-col gap-8 px-8 text-foreground/70">
      <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
        Impressum
      </h1>
      <p>Informationen gemäß § 5 TMG.</p>
      <div>
        <h3 className="text-lg font-bold text-foreground">Einzelunternehmen</h3>
        <p className="select-none">Dominik Koch</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">Kontakt</h3>
        <p className="select-none">
          Dominik Koch
					<br />
					c/o IP-Management #8532
					<br />
					Ludwig-Erhard-Str. 18
					<br />
					20459 Hamburg
					<br />
          Deutschland
        </p>
      </div>
      <p>Keine Annahme von Paketen oder Päckchen.</p>
      <p className="select-none">Email: dominik@wouldyoubot.com</p>
      <p className="select-none">Telefon: +49 151 23793107</p>
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
