/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // ✅ This enables static export with App Router
  // output: 'standalone', // ✅ enables full dynamic routes

  images: {
    unoptimized: true, // ✅ Required if using <Image /> with static export
  },
  env: {
    NEXT_PUBLIC_MODE: process.env.NEXT_PUBLIC_MODE,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
}

module.exports = nextConfig