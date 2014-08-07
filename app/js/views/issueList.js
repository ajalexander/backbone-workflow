define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Handlebars = require("handlebars"),
		Backbone = require("backbone"),
		IssueView = require("views/issue"),
		Issue = require("models/issue");

	return Backbone.View.extend({
		tagName:"div",

		addIssue: function() {
			var issue = new Issue();
			this.collection.push(issue);

			var subview = new IssueView({model:issue});
			$(this.el).append(subview.render().el);
			this.subviews.push(subview);
		},

		updateModelFromView: function() {
			$.each(this.subviews, function(index, subview) {
				subview.updateModelFromView();
			});
		},
		
		render:function (eventName) {
			var that = this;
			$(this.el).empty();

			this.subviews = [];
			this.collection.each(function(issue) {
				var subview = new IssueView({model:issue});
				$(that.el).append(subview.render().el);
				that.subviews.push(subview);
			});

			return this;
		}
	});
});
