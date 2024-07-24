import createNextIntlPlugin from 'next-intl/plugin';

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#move-i18n-ts
const withNextIntl = createNextIntlPlugin('src/utils/service/i18n');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
