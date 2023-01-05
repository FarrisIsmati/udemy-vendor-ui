/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    VENDORS_API_URL: process.env.VENDORS_API_URL,
    VENDORS_WEBSOCKET_URL: process.env.VENDORS_WEBSOCKET_URL
  }
}

module.exports = nextConfig
