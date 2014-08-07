define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		template = require("text!templates/confirmation.html");

	return Backbone.View.extend({
		tagName:"div",

		initialize: function() {
			this.template = Handlebars.compile(template);
		},
		
		render:function (eventName) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
});
