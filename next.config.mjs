import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dashboard.digitalnawab.com", "images.unsplash.com"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@inertiajs/react": path.resolve(__dirname, "src/lib/inertia-adapter.jsx"),
      "@/Components": path.resolve(__dirname, "src/components"),
    };
    return config;
  },
};

export default nextConfig;
