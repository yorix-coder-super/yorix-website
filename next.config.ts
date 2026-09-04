import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.yorix.website',
          },
        ],
        destination: 'https://yorix.website/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
