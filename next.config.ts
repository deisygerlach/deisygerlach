import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "",
  assetPrefix: "",
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;