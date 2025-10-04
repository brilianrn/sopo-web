const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  pageExtensions: ['ts', 'tsx'],
  generateEtags: false,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.freepik.com', 'sc04.alicdn.com', 's.alicdn.com'],
  },
  staticPageGenerationTimeout: 1000,
  env: {
    PORT: process.env.PORT,
    BASE_API_URL: process.env.BASE_API_URL,
    APP_KEY: process.env.APP_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_SESSION_MAX_AGE: process.env.NEXTAUTH_SESSION_MAX_AGE,
    FARMER_CODE: process.env.FARMER_CODE,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' http://localhost:4006/`,
          },
        ],
      },
    ];
  },
  /**
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack: (config) => {
    // Add dark mode support
    const rules = config.module.rules.find((r) => !!r.oneOf);
    rules.oneOf.forEach((loaders) => {
      if (Array.isArray(loaders.use)) {
        loaders.use.forEach((loader) => {
          const isCssLoader =
            typeof loader?.loader === 'string' && /(?<!post)css-loader/.test(loader?.loader);
          const hasGetLocalIdent = !!loader?.options?.modules?.getLocalIdent;
          if (isCssLoader && hasGetLocalIdent) {
            const { getLocalIdent } = loader.options.modules;
            if (getLocalIdent) {
              loader.options.modules.getLocalIdent = (...args) => {
                if (args.includes('dark')) return 'dark';
                return getLocalIdent(...args);
              };
            }
          }
        });
      }
    });

    // Add SVGR as a loader
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
});
