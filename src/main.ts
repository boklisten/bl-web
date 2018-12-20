import {
	enableProdMode,
	LOCALE_ID,
	TRANSLATIONS,
	TRANSLATIONS_FORMAT
} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { hmrBootstrap } from "./hmr";

if (environment.production) {
	enableProdMode();
	// DIBS live checkout script
	document.write(
		'<script src="https://checkout.dibspayment.eu/v1/checkout.js?v=1"></script>'
	);
} else {
	document.write(
		'<script src="https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"></script>'
	);
}

if (environment.hmr) {
	const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

	if (module["hot"]) {
		hmrBootstrap(module, bootstrap);
	} else {
		console.log("ERROR: HMR is not enabled for webpack-dev-server");
		console.log("Maybe you have not set the --hmr flag in ng serve");
	}
} else {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch(err => console.log(err));
}
