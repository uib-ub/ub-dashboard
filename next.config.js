/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  logging: {
    level: 'verbose',
    fullUrl: true,
  },
}

module.exports = nextConfig
