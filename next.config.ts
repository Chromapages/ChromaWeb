import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const studioHosts = /^[a-z0-9-]+$/.test(projectId ?? "")
      ? ` https://${projectId}.api.sanity.io https://${projectId}.apicdn.sanity.io`
      : "";
    const csp = (studio = false) => [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      `img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com${studio ? " https://cdn.sanity.io" : ""}`,
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
      `connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com${studio ? ` https://api.sanity.io https://cdn.sanity.io${studioHosts}` : ""}`,
      "frame-src 'self' https://www.googletagmanager.com",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp(),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "Content-Security-Policy", value: csp(true) }],
      },
    ];
  },
};

export default nextConfig;
