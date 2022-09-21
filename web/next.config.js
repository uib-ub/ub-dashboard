const { MARCUS_NEXT_URL } = process.env

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
    ]
  },
}
