/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    VENDORS_API_URL: process.env.VENDORS_API_URL
  }
}

module.exports = nextConfig
