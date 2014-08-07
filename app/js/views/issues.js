define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		template = require("text!templates/issues.html"),
		IssueListView = require("views/issueList"),
		ErrorAlertView = require("views/errorAlert");

	return Backbone.View.extend({
		tagName:"div",

		initialize: function() {
			this.template = Handlebars.compile(template);
		},

		events: {
			"click #addIssue": "addIssue",
			"submit form": "createClaim" 
		},

		addIssue: function(e) {
			e.preventDefault();
			this.issuesView.addIssue();
		},

		createClaim: function(e) {
			var that = this;

			e.preventDefault();

			var button = this.$el.find("#submit");
			button.prop("disabled", true);

			this.updateModelFromView();

			this.model.create(function(message) {
				var alertView = new ErrorAlertView({model:message})
				that.$el.find("#form-errors-container").append(alertView.render().el);
			});
			
			button.prop("disabled", false);
		},

		updateModelFromView: function() {
			this.issuesView.updateModelFromView();
		},
		
		render:function (eventName) {
			var newContent = $(this.el).html(this.template(this.model.toJSON()));

			this.issuesView = new IssueListView({collection: this.model.get("issues")});
			newContent.find("#issuesContainer").html(this.issuesView.render().el);

			return this;
		}
	});
});
