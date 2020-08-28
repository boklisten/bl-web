const { version } = require("../../package.json");
export const environment = {
	production: false,
	hmr: false,
	apiPath: "http://api.test.boklisten.no/",
	dibs: {
		checkoutKey: "test-checkout-key-1a6981e849434c8c90dd382878b4310d",
		language: "nb-NO"
	},
	version: version,
	versionName: "LOCAL"
};
