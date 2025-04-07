import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // TODO: remove after sometime
  },
  typescript: {
    ignoreBuildErrors: true, // TODO: remove after sometime
  },
};

export default nextConfig;
