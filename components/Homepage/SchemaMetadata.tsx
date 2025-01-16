'use server'

import { Schema } from '../Schema'

export async function HomeSchemaMetadata() {
  return (
    <>
      <Schema
        json={`
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
                  "name": "How do I invite the would you rather Discord bot?",
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
  `}
      />
    </>
  )
}
