const MARCUS_NEXT_URL = process.env.NEXT_PUBLIC_MARCUS_NEXT_URL

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/marcus-next',
        destination: `${MARCUS_NEXT_URL}/marcus-next`,
      },
      {
        source: '/marcus-next/:path*',
        destination: `${MARCUS_NEXT_URL}/marcus-next/:path*`,
      },
    ]
  },
}
