import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HOST_API_PUBLIC: process.env.HOST_API_PUBLIC,
    WS_API_PUBLIC: process.env.WS_API_PUBLIC,
  },
  devIndicators: false,
};

export default nextConfig;
