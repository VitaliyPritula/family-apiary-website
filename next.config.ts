import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/telegram',
      destination: 'https://t.me/+380990366231',
      permanent: false,
    },
    {
      source: '/viber',
      destination: 'viber://chat?number=+380990366231/',
      permanent: false,
    },
  ],
};

export default nextConfig;
