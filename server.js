
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));


// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS

/*
const forceSSL = function() {
	return function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
				['https://', req.get('Host'), req.url].join('')
			);
		}
		next();
	}
};

*/

// Instruct the app
// to use the forceSSL
// middleware

//app.use(forceSSL());





// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
// use this when you turn off the hash in angular, aka domain/#/endpoint

/*
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});


*/


app.listen(process.env.PORT || 8080);
