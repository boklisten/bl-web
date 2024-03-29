const { version } = require("../../package.json");
export const environment = {
	production: true,
	hmr: false,
	apiPath: "https://api.boklisten.no/",
	nextPath: "https://next.boklisten.no/",
	dibs: {
		checkoutKey: "live-checkout-key-e294063ced7f43b89c58419024a33e79",
		language: "nb-NO",
	},
	version: version,
	versionName: "",
};
