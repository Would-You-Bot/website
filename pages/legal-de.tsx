import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function legalnoticede() {
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>

      <Navbar />

      <main className="legal-notice-main">
        <h1>Impressum</h1>
        <div className="legal-notice-content">
          <p>Informationen gemäß § 5 TMG.</p>
          <h3>Kontakt</h3>
          <p className="select-none">
            Dominik Koch
            <br />
            Parkstraße 5<br />
            88499 Riedlingen
            <br />
            Deutschland
          </p>
          <br />
          <p>Keine Annahme von Paketen oder Päckchen.</p>
          <br />
          <p>Email: dominik@wouldyoubot.com</p>

          <h3>Online dispute resolution</h3>
          <p>
          Die Europäische Kommission bietet eine Plattform für die Online-Streitbeilegung Streitbeilegung, die hier zu finden ist:{" "}
            <Link
              href="https://ec.europa.eu/consumers/odr/"
              className="embedded-link"
            >
              https://ec.europa.eu/consumers/odr/
            </Link>
            <br />Ich bin weder bereit noch verpflichtet, an einem Streitbeilegungsverfahren
            an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h3>Would You Bot&apos;s Privacy Policy</h3>
          <Link
            href="https://wouldyoubot.gg/privacy/"
            className="link"
          >
            https://wouldyoubot.gg/privacy/
          </Link>

          <h3>Gültigkeit dieses Impressums</h3>
          <p>
          Dieser rechtliche Hinweis gilt für die folgenden Websites, Social Media
            Konten und andere Dienste, sofern sie hier aufgeführt sind.
          </p>
          <br />
          <Link href="https://wouldyoubot.com/" className="link">
            https://wouldyoubot.com/
          </Link>
          <br />
          <Link href="https://wouldyoubot.gg/" className="link">
            https://wouldyoubot.gg/
          </Link>
          <br />
          <Link
            href="https://twitter.com/WouldYouBot/"
            className="link"
          >
            https://twitter.com/WouldYouBot/
          </Link>
          <br />
          <br />
          <p>
          Der Discord-Benutzer/Bot &quot;Would You&quot; mit dem ID 981649513427111957
            <br />
            Der Discord Server &quot;Would You &quot; mit der ID1009562516105461780
          </p>
          <br />
          <br />
          <br />
        </div>
      </main>

      <Footer />
    </>
  );
}
