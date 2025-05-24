/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
      },
      images: {
        remotePatterns: [
          {
            // protocol: "https",
            hostname: "drsaun777.sirv.com",
          },
          {
            protocol: "https",
            hostname: "example.com",
          },
        ],
      },
};

export default nextConfig;
