import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    // Configure allowed quality values for next/image (required in Next.js 16+)
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
