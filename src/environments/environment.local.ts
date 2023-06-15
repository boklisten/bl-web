const { version } = require("../../package.json");
export const environment = {
	production: false,
	hmr: true,
	apiPath: "http://localhost:1337/",
	nextPath: "http://localhost:3000/",
	dibs: {
		checkoutKey: "test-checkout-key-1a6981e849434c8c90dd382878b4310d",
		language: "nb-NO",
	},
	version: version,
	versionName: "LOCAL",
};
