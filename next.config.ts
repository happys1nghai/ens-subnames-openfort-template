import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@solana/kit", "@solana/kora", "@solana/web3.js"],
};

export default nextConfig;