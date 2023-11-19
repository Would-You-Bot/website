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
              "description":"Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
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
                 "name":"policechase"
              },
              "reviewBody":"Man, this developer gives one on one support with the team. Absolute legend."
           },
           "aggregateRating":{
              "@type":"AggregateRating",
              "ratingValue":5,
              "ratingCount":34,
              "bestRating":5,
              "worstRating":1
           }
        }
  `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can I increase the activity on my Discord server?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Using a popular engagement bot such as Would You can help revive activity on your server. This bot allows your community to play games like Would You Rather, Truth or Dare, Never Have I Ever, or Higher or Lower on Discord."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I invite the would you rather discord bot?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To invite the Would You Discord bot, visit their website at https://wouldyoubot.gg/ and click on the 'unleash the fun' button. This will take you to Discord, where you will be prompted to invite the bot."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I play would you rather on Discord?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can. To play would you rather on Discord, go to https://wouldyoubot.gg and click the 'unleash the fun' button to invite the would you rather bot!"
                  }
                }
              ]
            }
  `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "http://schema.org",
              "@type": "VideoObject",
              "name": "How to use Would You Bot",
              "description": "https://wouldyoubot.com/  Boost Your Discord Server's Engagement with 'Would You' Bot! Discover how this powerful Discord bot revolutionizes your community interactions, sparking lively discussions, and keeping your server active. Engage your members with captivating 'Would You Rather' questions, polls, and games, fostering a dynamic and thriving community. Watch our video for a comprehensive overview and step-by-step setup guide to unleash the full potential of 'Would You' bot and take your Discord server to the next level!",
              "thumbnailUrl": "https://i.ytimg.com/vi/x6BMCtgIy-8/default.jpg",
              "uploadDate": "2023-06-21T13:03:23Z",
              "duration": "PT30S",
              "embedUrl": "https://www.youtube.com/embed/x6BMCtgIy-8",
              "interactionCount": "166"
            }
  `,
          }}
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
        <meta property="og:title" content="Would You | The Discord Bot" />
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
