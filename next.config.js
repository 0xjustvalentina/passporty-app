/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig