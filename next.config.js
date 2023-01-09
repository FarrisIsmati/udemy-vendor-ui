/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    VENDORS_API_URL: process.env.VENDORS_API_URL,
    VENDORS_WEBSOCKET_URL: process.env.VENDORS_WEBSOCKET_URL
  },
  output: 'standalone'
}

module.exports = nextConfig
