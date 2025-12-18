import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.cdn.aoe2companion.com",
      },
    ],
  },
};

export default nextConfig;
