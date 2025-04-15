import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/KDE/plasma-workspace-wallpapers/refs/heads/master/Mountain/contents/images_dark/5120x2880.png',

      }
    ]
  }
};

export default nextConfig;
