/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/locales/i18n.ts');

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
