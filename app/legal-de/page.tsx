import Link from 'next/link'

export default function legalnoticede() {
	return (
		<main className="flex mx-auto w-full max-w-8xl flex-col gap-8 px-8 text-foreground/70">
			<h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
				Impressum
			</h1>
			<p>Informationen gemäß § 5 TMG.</p>
			<div>
				<h3 className="text-lg font-bold text-foreground">Kontakt</h3>
				<p className="select-none">
					Dominik Koch
					<br />
					Parkstraße 5
					<br />
					88499 Riedlingen
					<br />
					Deutschland
				</p>
			</div>
			<p>Keine Annahme von Paketen oder Päckchen.</p>
			<p className="select-none">Email: dominik@wouldyoubot.com</p>
			<p className="select-none">Telefon: +49 151 23793107</p>
			<div>
				<h3 className="text-lg font-bold text-foreground">
					Online dispute resolution
				</h3>
				<p>
					Die Europäische Kommission bietet eine Plattform für die
					Online-Streitbeilegung Streitbeilegung, die hier zu finden ist:{' '}
					<Link
						href="https://ec.europa.eu/consumers/odr/"
						className="text-foreground underline"
					>
						https://ec.europa.eu/consumers/odr/
					</Link>
					. <br />
					Ich bin weder bereit noch verpflichtet, an einem
					Streitbeilegungsverfahren an einem Streitbeilegungsverfahren vor einer
					Verbraucherschlichtungsstelle teilzunehmen.
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
					Gültigkeit dieses Impressums
				</h3>
				<p>
					Dieser rechtliche Hinweis gilt für die folgenden Websites, Social
					Media Konten und andere Dienste, sofern sie hier aufgeführt sind.
				</p>
			</div>
			<div className="text-foreground">
				<Link
					href="https://wouldyoubot.com/"
					className="underline"
				>
					https://wouldyoubot.com/
				</Link>
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
				Der Discord Bot mit der id{' '}
				<span className="font-mono text-foreground">981649513427111957</span>
				<br />
				Der Discord server mit der id{' '}
				<span className="font-mono text-foreground">1009562516105461780</span>
			</p>
		</main>
	)
}
