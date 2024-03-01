/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.discordapp.com',
      port: '',
      pathname: '/',
    },
    {
      protocol: 'https',
      hostname: 'cdn.wouldyoubot.gg',
      port: '',
      pathname: '/**'
    },
    ],
  },

  async redirects() {
    return [
      {
        source: "/discord",
        destination: "/support",
        permanent: true,
      },
      {
        source: "/imprint",
        destination: "/legal",
        permanent: true,
      },
      {
        source: "/impressum",
        destination: "/legal-de",
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
