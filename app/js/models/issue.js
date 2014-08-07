define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone");

	return Backbone.Model.extend({
		defaults: {
			title: "",
			description: ""
		}
	});
});
