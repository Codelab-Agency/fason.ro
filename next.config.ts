import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.FASON_BUILD_DIR || ".next",
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: { qualities: [75, 85] },
  headers() {
    return ["/fonts/:asset", "/images/hero/:asset"].map((source) => ({
      source,
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    }));
  },
  devIndicators: false,
};

export default nextConfig;
