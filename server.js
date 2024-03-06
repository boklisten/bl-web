const express = require("express");
const app = express();
const path = require("path");

app.get("*", function (req, res, next) {
	if (
		req.headers["x-forwarded-proto"] !== "https" &&
		process.env.NODE_ENV === "production"
	) {
		res.redirect("https://" + req.hostname + req.url);
	} else {
		next();
	}
});

app.use(express.static(__dirname + "/dist"));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
// use this when you turn off the hash in angular, aka domain/#/endpoint
app.get("*", function (req, res) {
	if (
		req.headers["x-forwarded-proto"] !== "https" &&
		process.env.NODE_ENV === "production"
	) {
		res.redirect("https://" + req.hostname + req.url);
	} else {
		console.log(String(req.path));
		if (
			String(req.path).endsWith(
				"/.well-known/apple-developer-merchantid-domain-association"
			)
		) {
			console.log("sending file");
			return res.sendFile(
				path.join(
					__dirname,
					"/dist/assets/dibs/apple-developer-merchantid-domain-association.txt"
				)
			);
		}

		res.sendFile(path.join(__dirname + "/dist/index.html"));
	}
});

app.listen(process.env.PORT || 4200);
