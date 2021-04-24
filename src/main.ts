import {
	enableProdMode,
	LOCALE_ID,
	TRANSLATIONS,
	TRANSLATIONS_FORMAT,
} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

Sentry.init({
  dsn: "https://ca4dd38c2e8e4af0902a2db3d00a159a@o569888.ingest.sentry.io/5716176",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "https://boklisten.no"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.log(err));
