import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HOST_API_PUBLIC: process.env.HOST_API_PUBLIC,
  },
};

export default nextConfig;
