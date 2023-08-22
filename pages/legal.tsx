import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function legalnotice() {
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>

      <Navbar />

      <main className="legal-notice-main">
        <h1>Legal Notice</h1>
        <p>For the german version please visit <Link href="/legal-de" className="embedded-link">this page</Link>.</p>
        <br />
        <div className="legal-notice-content">
          <p>Information according to § 5 TMG.</p>
          <h3>Contact</h3>
          <p className="select-none">
            Dominik Koch
            <br />
            Parkstrasse 5<br />
            88499 Riedlingen
            <br />
            Germany
          </p>
          <br />
          <p>No acceptance of parcels or packages.</p>
          <br />
          <p>Email: dominik@wouldyoubot.com</p>

          <h3>Online dispute resolution</h3>
          <p>
            The European Comission provides a platform for online dispute
            resolution, available here:{" "}
            <Link
              href="https://ec.europa.eu/consumers/odr/"
              className="embedded-link"
            >
              https://ec.europa.eu/consumers/odr/
            </Link>
            <br />I am neither willing nor obliged to participate in dispute
            resolution proceedings in front of a consumer arbitration board.
          </p>

          <h3>Would You Bot&apos;s Privacy Policy</h3>
          <Link
            href="https://wouldyoubot.gg/privacy/"
            className="link"
          >
            https://wouldyoubot.gg/privacy/
          </Link>

          <h3>Validy of this Legal Notice</h3>
          <p>
            This legal notice is valid for the following websites, social media
            accounts and other services, as long as they are listed here.
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
            The Discord user / bot Would You with the ID 981649513427111957
            <br />
            The Discord server Would You Support with the ID 1009562516105461780
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
