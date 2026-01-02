import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' && {
      exclude: ['error']
    }
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['wouldyoubot.gg']
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://top.gg https://bottom.gg https://dsc.bot https://nightly.dsc.bot;"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/support',
        destination: 'https://discord.com/invite/vMyXAxEznS',
        permanent: true
      },
      {
        source: '/rivo',
        destination: 'https://rivo.gg',
        permanent: true
      },
      {
        source: '/invite',
        destination:
          'https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands',
        permanent: true,
      },
      {
        source: '/reddit',
        destination: 'https://www.reddit.com/r/WouldYou/',
        permanent: true
      },
      {
        source: '/discord',
        destination: '/support',
        permanent: true
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/imprint',
        destination: '/legal',
      },
      {
        source: '/impressum',
        destination: '/legal-de',
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'startupfa.me',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
