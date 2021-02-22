import { NgModuleRef, ApplicationRef } from "@angular/core";
import { createNewHosts } from "@angularclass/hmr";

/*
 * A function for makeing Hot Module Reloading (HMR) possible
 * please read these for more info:
 * https://medium.com/@beeman/tutorial-enable-hmr-in-angular-cli-apps-1b0d13b80130f
 * https://www.npmjs.com/package/@angularclass/hmr*
 */
export const hmrBootstrap = (
	module: any,
	bootstrap: () => Promise<NgModuleRef<any>>
) => {
	let ngModule: NgModuleRef<any>;
	module.hot.accept();
	bootstrap().then((mod) => (ngModule = mod));
	module.hot.dispose(() => {
		const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
		const elements = appRef.components.map((c) => c.location.nativeElement);
		const makeVissible = createNewHosts(elements);
		ngModule.destroy();
		makeVissible();
	});
};
