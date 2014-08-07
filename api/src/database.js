var mongoose = require("mongoose");

function initialize(connectionString) {
	mongoose.connect(connectionString);
}

exports.initialize = initialize
