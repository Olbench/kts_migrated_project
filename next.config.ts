import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-school-strapi.ktsdev.ru',
      },
      {
        protocol: 'https',
        hostname: 'front-school.minio.ktsdev.ru',
      },
    ],
  },
}

export default nextConfig
