import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { hmrBootstrap } from "./hmr";

document.write(
	'<script src="https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"></script>'
);

if (environment.hmr == true) {
	if (module["hot"]) {
		hmrBootstrap(module, () =>
			platformBrowserDynamic().bootstrapModule(AppModule)
		);
	} else {
		console.log("ERROR: HMR is not enabled for webpack-dev-server");
		console.log("Maybe you have not set the --hmr flag in ng serve");
	}
} else {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch(err => console.log(err));
}
