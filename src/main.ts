import {enableProdMode, LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
	enableProdMode();
  // DIBS live checkout script
  document.write('<script src="https://checkout.dibspayment.eu/v1/checkout.js?v=1"></script>');
} else {
  // DIBS test checkout script
  document.write('<script src="https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"></script>');
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.log(err));

