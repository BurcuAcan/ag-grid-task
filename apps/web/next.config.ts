import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  transpilePackages: ['ag-grid-community', 'ag-grid-react'],
};

export default nextConfig;
