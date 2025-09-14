// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import env from '@/utils/service/env';
import {beforeSend} from '@/utils/extend/library/sentry';

Sentry.init({
  dsn: "https://3eac12c16b133b334a04d7d3f86d19db@o4508301096714240.ingest.us.sentry.io/4508301177978880",
  debug: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'development',
  enabled: env.public.sentryEnabled,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  beforeSend: beforeSend,
});
