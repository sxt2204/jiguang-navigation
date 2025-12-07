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
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
