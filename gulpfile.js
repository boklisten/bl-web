const gulp = require("gulp");
const download = require("gulp-download-stream");

function downloadDibsScript() {
	const useTestIntegration =
		process.env.ANGULAR_ENV !== "production-nb" ? "test." : "";
	return download({
		file: "dibs-easy-checkout.js",
		url: `https://${useTestIntegration}checkout.dibspayment.eu/v1/checkout.js?v=1`,
	}).pipe(gulp.dest("scripts/dibs/"));
}

exports.default = downloadDibsScript;
