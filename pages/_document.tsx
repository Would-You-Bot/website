import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          data-domain="wouldyoubot.gg"
          src="https://stats.wouldyoubot.gg/js/script.js"
        ></script>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!"
        />
        <meta
          property="og:description"
          content="Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!"
        />
        <meta
          property="og:title"
          content="Would You | Truth or Dare Discord Bot"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="0" />
        <meta name="theme-color" content="#0598F6" />
        <meta name="msapplication-TileColor" content="#0598F6" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
