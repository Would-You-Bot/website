import Link from "next/link";

export default function legalnotice() {
  return (
    <main className="flex flex-col gap-8 px-8 text-neutral-300 xl:px-[17vw]">
      <h1 className="mt-36 text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
        Legal Notice
      </h1>
      <p>
        <span className="mr-1.5 text-lg">🇩🇪</span>
        For the German version please visit{" "}
        <Link href="/legal-de" className="text-white underline">
          this page
        </Link>
        .
      </p>
      <p>Information according to § 5 TMG.</p>
      <div>
        <h3 className="text-lg font-bold text-white">Contact</h3>
        <p className="select-none">
          Dominik Koch
          <br />
          Parkstrasse 5<br />
          88499 Riedlingen
          <br />
          Germany
        </p>
      </div>
      <p>No acceptance of parcels or packages.</p>
      <p>Email: dominik@wouldyoubot.com</p>
      <div>
        <h3 className="text-lg font-bold text-white">
          Online dispute resolution
        </h3>
        <p>
          The European Comission provides a platform for online dispute
          resolution, available at{" "}
          <Link
            href="https://ec.europa.eu/consumers/odr/"
            className="text-white underline"
          >
            https://ec.europa.eu/consumers/odr/
          </Link>
          . <br />I am neither willing nor obliged to participate in dispute
          resolution proceedings in front of a consumer arbitration board.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
        <Link
          href="https://wouldyoubot.gg/privacy/"
          className="text-white underline"
        >
          https://wouldyoubot.gg/privacy/
        </Link>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">
          Validity of this Legal Notice
        </h3>
        <p>
          This legal notice is valid for the following websites, social media
          accounts and other services, as long as they are listed below.
        </p>
      </div>
      <div className="text-white">
        <Link href="https://wouldyoubot.com/" className="underline">
          https://wouldyoubot.com/
        </Link>
        <br />
        <Link href="https://wouldyoubot.gg/" className="underline">
          https://wouldyoubot.gg/
        </Link>
        <br />

        <Link href="https://rivo.gg/" className="underline">
          https://rivo.gg/
        </Link>
        <br />
        <Link href="https://twitter.com/WouldYouBot/" className="underline">
          https://twitter.com/WouldYouBot/
        </Link>
      </div>
      <p>
        The Discord bot with the id{" "}
        <span className="font-mono text-white">981649513427111957</span>
        <br />
        The Discord server with the id{" "}
        <span className="font-mono text-white">1009562516105461780</span>
      </p>
    </main>
  );
}
