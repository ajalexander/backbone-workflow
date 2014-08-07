define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		template = require("text!templates/errorAlert.html");

	return Backbone.View.extend({
		tagName:"div",

		initialize: function() {
			this.template = Handlebars.compile(template);
		},

		render:function (eventName) {
			$(this.el).html(this.template({message:this.model}));
			return this;
		}
	});
});
