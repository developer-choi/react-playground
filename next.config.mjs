import {withSentryConfig} from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#move-i18n-ts
const withNextIntl = createNextIntlPlugin('src/utils/service/common/i18n');

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
  transpilePackages: ['@forworkchoe/core'],
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'node_modules')],
  },
};

/**
 * Do you want to route Sentry requests in the browser through your Next.js server to avoid ad blockers?
 * > No
 *
 * Do you want to enable React component annotations to make breadcrumbs and session replays more readable?
 * > Yes
 *
 * Do you want to enable Tracing to track the performance of your application?
 * > No
 *
 * Do you want to enable Sentry Session Replay to get a video-like reproduction of errors during a user session?
 * > No
 */
export default withSentryConfig(withNextIntl(nextConfig), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'choeyujin',
  project: 'react-playground',
  authToken: process.env.SENTRY_AUTH_TOKEN,

// Only print logs for uploading source maps in CI
  silent: true,

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
// tunnelRoute: '/monitoring',

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