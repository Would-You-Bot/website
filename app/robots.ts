import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        userAgent: 'Cliqzbot',
        disallow: '/'
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/'
      }
    ],
    sitemap: 'https://wouldyoubot.gg/sitemap.xml',
    host: 'https://wouldyoubot.gg'
  }
}
