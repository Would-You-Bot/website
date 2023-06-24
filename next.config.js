/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: process.env.NEXT_PUBLIC_DISCORD,
        permanent: true,
      },
      {
        source: "/invite",
        destination: process.env.NEXT_PUBLIC_INVITE,
        permanent: true,
      },
      {
        source: "/vote",
        destination: process.env.NEXT_PUBLIC_VOTE,
        permanent: true,
      },
      {
        source: "/reddit",
        destination: process.env.NEXT_PUBLIC_REDDIT,
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
