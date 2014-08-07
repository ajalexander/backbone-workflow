 define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		template = require("text!templates/createClaim.html");

	return Backbone.View.extend({
		tagName:"div",

		initialize: function() {
			this.template = Handlebars.compile(template);
		},

		events: {
		},
		
		render:function (eventName) {
			$(this.el).html(this.template());
			return this;
		}
	});
});
 