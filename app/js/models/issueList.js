define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone"),
		Issue = require("models/issue");

	return Backbone.Collection.extend({
		model: Issue
	});
});
