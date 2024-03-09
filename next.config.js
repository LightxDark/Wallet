/** @type {import('next').NextConfig} */
const nextConfig = {
}

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.moralis.io',
            port: '',
            pathname: '/eth/**',
          },
        ],
    }
  }