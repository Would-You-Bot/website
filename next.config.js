/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["japi.rest"]
},
  async redirects() {
    return [
      {
        source: '/discord',
        destination: process.env.NEXT_PUBLIC_DISCORD,
        permanent: true,
      },
      {
        source: '/invite',
        destination: process.env.NEXT_PUBLIC_INVITE,
        permanent: true,
      },
      {
        source: '/vote',
        destination: process.env.NEXT_PUBLIC_VOTE,
        permanent: true,
      },
      {
        source: '/reddit',
        destination: "https://www.reddit.com/r/WouldYou/",
        permanent: true,
      },
      {
        source: '/imprint',
        destination: "/legal",
        permanent: true,
      },
      {
        source: '/impressum',
        destination: "/legal-de",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
