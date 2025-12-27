import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Hostinger VPS deployment
  output: "standalone",

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable React Compiler for performance (if needed)
    // reactCompiler: true,
  },
};

export default nextConfig;
