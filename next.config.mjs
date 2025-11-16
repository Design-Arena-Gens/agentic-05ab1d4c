/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["react", "react-dom", "date-fns"],
  },
};

export default nextConfig;
