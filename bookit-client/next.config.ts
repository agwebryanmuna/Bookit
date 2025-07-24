import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cloud.appwrite.io",
      port: "",
      pathname: "/v1/storage/buckets/**/files/**/view",
    }],
  },
};

export default nextConfig;
