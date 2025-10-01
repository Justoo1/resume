import type { NextConfig } from "next";
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"cdn.sanity.io",
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Disable PWA in development to avoid Turbopack warnings
  ...(process.env.NODE_ENV === 'production' && {
    webpack: (config: any) => {
      return config;
    }
  })
};

// Only apply PWA wrapper in production
const config = process.env.NODE_ENV === 'production'
  ? withPWA({
      dest: 'public',
      register: true,
      skipWaiting: true,
    })(nextConfig)
  : nextConfig;

export default config;
