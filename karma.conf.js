// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// To make chrome headless only run in terminal
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
	config.set({
		basePath: "./src/app/",
		frameworks: ["jasmine", "@angular-devkit/build-angular"],
		plugins: [
			require("karma-jasmine"),
			require("karma-chrome-launcher"),
			require("karma-jasmine-html-reporter"),
			require("karma-coverage-istanbul-reporter"),
			require("@angular-devkit/build-angular/plugins/karma"),
		],
		exclude: ["node_modules/"],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
			jasmine: {
				random: false,
			},
		},
		coverageIstanbulReporter: {
			dir: require("path").join(__dirname, "coverage"),
			reports: ["html", "lcovonly"],
			fixWebpackSourcePaths: true,
		},
		/*
		customLaunders: {
			ChromeHeadless: {
				base: "Chrome",
				flags: [
					"--headless",
					"--disable-gpu",
					"--remote-debugging-port=9222"
				]
			}
		},
    */
		reporters: ["progress", "kjhtml"],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		//autoWatch: true,
		browsers: ["ChromeHeadless"],
		singleRun: false,
		browserNoActivityTimeout: 70000,
	});
};
