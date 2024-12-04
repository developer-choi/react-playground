import {withSentryConfig} from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#move-i18n-ts
const withNextIntl = createNextIntlPlugin('src/utils/service/i18n');

/** @types {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'github.com',
      },
    ],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'choeyujin',
  project: 'react-playground',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  productionBrowserSourceMaps: true,

// Only print logs for uploading source maps in CI
  silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
  tunnelRoute: '/monitoring',

// Hides source maps from generated client bundles
  hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});