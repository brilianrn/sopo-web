import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: isDev,
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  images: {
    domains: ["img.freepik.com", "sc04.alicdn.com", "s.alicdn.com"],
  },
  staticPageGenerationTimeout: 1000,
  env: {
    PREFIX_API_V1: process.env.PREFIX_API_V1 ?? "",
  },
  webpack(config: any) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

// 👉 pakai any biar gak clash sama typings next-pwa
export default withPWA({
  dest: "public",
  disable: isDev,
})(nextConfig as any);
