import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://wouldyoubot.gg',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/terms',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/legal',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
			alternates: {
				languages: {
					de: 'https://wouldyoubot.gg/legal-de'
				}
			}
		},
		{
			url: 'https://wouldyoubot.gg/terms',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/team',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/status',
			lastModified: new Date(),
			changeFrequency: 'hourly',
			priority: 0.9
		},
		{
			url: 'https://wouldyoubot.gg/security',
			lastModified: new Date(),
			changeFrequency: 'never',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/refunds',
			lastModified: new Date(),
			changeFrequency: 'always',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/security',
			lastModified: new Date(),
			changeFrequency: 'never',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/privacy',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/premium',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/commands',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/blog',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/blog/welcome',
			lastModified: new Date(),
			changeFrequency: 'never',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/blog/how-discord-made-the-biggest-youtube-view-bot-by-accident',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/blog/how-to-make-your-discord-server-more-fun',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://wouldyoubot.gg/blog/how-to-restrict-a-discord-bot-to-one-channel',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		}
	]
}
