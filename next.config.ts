import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  }
};

export default nextConfig;
