const gulp = require("gulp");
const download = require("gulp-download-stream");

const destFolder = "scripts/dibs/";
const dibsEasyCheckoutName = "dibs-easy-checkout.js";

function downloadDibsTestScript() {
	return download({
		file: dibsEasyCheckoutName,
		url: "https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"
	}).pipe(gulp.dest(destFolder));
}

function downloadDibsProdScript() {
	return download({
		file: dibsEasyCheckoutName,
		url: "https://checkout.dibspayment.eu/v1/checkout.js?v=1"
	}).pipe(gulp.dest(destFolder));
}

exports.test = downloadDibsTestScript;
exports.production = downloadDibsProdScript;
exports.development = downloadDibsTestScript;
