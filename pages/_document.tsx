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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context":"http://schema.org",
              "@type":"Product",
              "name":"Would You Bot",
              "url":"https://wouldyoubot.gg",
              "logo":"https://i.imgur.com/YjwOfOX.png",
              "image":"https://i.imgur.com/OPQaiVa.png",
              "description":"Increase server engagement and entertain your members with Would You, featuring user polls, daily questions, and customization. Would You Rather",
              "sameAs":[
                 "https://twitter.com/wouldyoubot",
                 "https://www.youtube.com/@wouldyoubot",
                 "https://top.gg/bot/981649513427111957"
              ],
              "offers":{
                "@type":"Offer",
                "availability":"https://schema.org/OnlineOnly",
                "price":"0.00",
                "priceCurrency":"USD",
                "url":"https://wouldyoubot.gg"
             },
             "review":{
              "@type":"Review",
              "reviewRating":{
                 "@type":"Rating",
                 "bestRating":5,
                 "worstRating":1,
                 "ratingValue":5
              },
              "author":{
                 "@type":"Person",
                 "name":"_kiru_"
              },
              "reviewBody":"Geiler Bot, fördert die Aktivität des Server&apos;s enorm. Der Developer ist auch sehr symphytisch. Kann ich nur weiter empfehlen!"
           },
           "aggregateRating":{
              "@type":"AggregateRating",
              "ratingValue":5,
              "ratingCount":32,
              "bestRating":5,
              "worstRating":1
           }
        }
  `,
          }}
        ></script>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Would you is a fun little bot for every server! Provide your server with fun little would you questions!"
        />
        <meta
          property="og:description"
          content="Would you is a fun little bot for every server! Provide your server with fun little would you questions!"
        />
        <meta property="og:title" content="Would You | Discord Bot" />
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
