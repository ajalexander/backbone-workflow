define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		template = require("text!templates/issue.html");

	return Backbone.View.extend({
		tagName:"div",

		initialize: function() {
			this.template = Handlebars.compile(template);
		},

		updateModelFromView: function() {
			this.model.set({ title: this.$el.find("#title").val() });
			this.model.set({ description: this.$el.find("#description").val() });
		},
		
		render:function (eventName) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
});
