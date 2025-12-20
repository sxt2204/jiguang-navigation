import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.google.com' }, // Google Favicons
      { protocol: 'https', hostname: 'bing.com' },       // Bing Wallpapers
      { protocol: 'https', hostname: 'cn.bing.com' },    // CN Bing
      { protocol: 'https', hostname: 'images.weserv.nl' }, // Weserv
      { protocol: 'http', hostname: '**' },              // Allow all http for user uploaded/custom legacy
      { protocol: 'https', hostname: '**' },             // Allow all https for user custom
    ],
    dangerouslyAllowSVG: true,
  },

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Exclude public/uploads from file watching to prevent reload loops
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/public/uploads/**'
        ],
      };
    }
    return config;
  },
};


export default nextConfig;
