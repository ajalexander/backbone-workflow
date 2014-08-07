var express = require("express");
var bodyParser = require("body-parser");

function start(port, setupHandlers) {
	var app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	var router = express.Router();

	router.use(function(req, res, next) {
		console.log("%s: %s", req.method, req.originalUrl);
		next();
	});

	setupHandlers(router);

	app.use("/", router);

	app.listen(port);
	console.log("Listening on port " + port);
}

exports.start = start;
