
var express = require('express');
var app = express();
var path = require('path');



app.use(express.static(__dirname + '/dist'));

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
app.get('*', function(req, res, next) {
	if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
		res.redirect('https://' + req.hostname + req.url);
	} else {
		next();
	}
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
// use this when you turn off the hash in angular, aka domain/#/endpoint
app.all('*', function (req, res) {
	res.status(200).sendFile('index.html', {root: __dirname + '/dist/'});
});


app.listen(process.env.PORT || 4200);
