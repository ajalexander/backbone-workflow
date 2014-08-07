define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		template = require("text!templates/planSearch.html"),
		ErrorAlertView = require("views/errorAlert");

	return Backbone.View.extend({
		tagName:"div",

		initialize: function() {
			this.template = Handlebars.compile(template);
		},

		events: {
			"submit form": "submitSearch" 
		},

		submitSearch: function(e) {
			var that = this;

			e.preventDefault();

			var button = this.$el.find("#submit");
			button.prop("disabled", true);

			this.updateModelFromView();

			this.model.search(function(message) {
				var alertView = new ErrorAlertView({model:message})
				that.$el.find("#form-errors-container").append(alertView.render().el);
			});
			
			button.prop("disabled", false);
		},

		updateModelFromView: function() {
			this.model.set({ policyNumber: this.$el.find("#policyNumber").val() });
			this.model.set({ firstName: this.$el.find("#firstName").val() });
			this.model.set({ lastName: this.$el.find("#lastName").val() });
		},

		render:function (eventName) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
});
