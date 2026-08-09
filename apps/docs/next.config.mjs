/** @type {import('next').NextConfig} */
const config = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@safelagoon/ui"],
  webpack(config) {
    config.module.rules.push({
      test: /\.tsx$/,
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default config;
