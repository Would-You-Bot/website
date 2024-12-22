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
  `}
			/>

			<Schema
				json={`
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
      `}
			/>
		</>
	)
}
