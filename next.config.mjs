/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dashboard.digitalnawab.com", "images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dashboard.digitalnawab.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
