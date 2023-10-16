/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    logging: {
      level: 'verbose',
      fullUrl: true,
    },
  }
}

module.exports = nextConfig
