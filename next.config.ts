import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/#products',
        permanent: true,
      },
      // Add other legacy paths to redirect to homepage
      {
        source: '/home',
        destination: '/',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
