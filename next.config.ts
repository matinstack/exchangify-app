import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  cacheComponents: true,

  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    useTypeScriptCli: true,
  },

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },
};

export default nextConfig;
