import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Hostinger VPS deployment
  output: "standalone",

  // Transpile Sanity packages for Turbopack compatibility
  transpilePackages: ['next-sanity'],

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
