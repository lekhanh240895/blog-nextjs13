/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.**",
      },
    ],
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
