import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dx4rloqv5/**",
      },
    ],
  },
};

export default nextConfig;
