// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import env from '@/utils/service/env';

Sentry.init({
  dsn: "https://3eac12c16b133b334a04d7d3f86d19db@o4508301096714240.ingest.us.sentry.io/4508301177978880",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: env.public.sentryEnabled
});
