import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["dashboard.digitalnawab.com", "images.unsplash.com"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@inertiajs/react": path.resolve(__dirname, "src/lib/inertia-adapter.jsx"),
      "@/Components": path.resolve(__dirname, "src/components"),
      "@/Pages": path.resolve(__dirname, "src/admin-pages"),
      "@/admin-pages": path.resolve(__dirname, "src/admin-pages"),
      "@/backend": path.resolve(__dirname, "backend"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@inertiajs/react": "./src/lib/inertia-adapter.jsx",
      "@/Components": "./src/components",
      "@/Pages": "./src/admin-pages",
      "@/admin-pages": "./src/admin-pages",
      "@/backend": "./backend",
    },
  },
};

export default nextConfig;
