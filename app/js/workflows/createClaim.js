define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone"),

		PlanSearchView = require("views/planSearch"),
		PlanSearch = require("models/planSearch"),

		BasicInformationView = require("views/basicInformation"),
		BasicInformation = require("models/basicInformation"),

		IssuesView = require("views/issues"),
		Issues = require("models/issues"),

		ConfirmationView = require("views/confirmation"),
		Confirmation = require("models/confirmation");

	return Backbone.Model.extend({
		workflowOrder: [
			"planSearch",
			"basicInformation",
			"issues",
			"confirmation"
		],

		initialize: function() {
			this.currentIndex = -1;;
		},

		start: function(data) {
			this.next(data);
		},

		next: function(data) {
			this.currentIndex++;
			this.currentStep = this.workflowOrder[this.currentIndex];
			this[this.currentStep](data);
		},

		planSearch: function(data) {
			var model = new PlanSearch(
				{},
				{workflow:this});
			this.loadView(new PlanSearchView({model:model}));
		},

		basicInformation: function(data) {
			var model = new BasicInformation(
				{},
				{policy:data, workflow:this});
			this.loadView(new BasicInformationView({model:model}));
		},

		issues: function(data) {
			var model = new Issues(
				{description:data.description},
				{policy:data.policy, workflow:this});
			this.loadView(new IssuesView({model:model}));
		},

		confirmation: function(data) {
			var model = new Confirmation(
				{},
				{claim:data, workflow:this});
			this.loadView(new ConfirmationView({model:model}));
		},

		loadView: function(subview) {
			var that = this;

			if (this.subview) {
				this.subview.remove();
			}
			this.subview = subview;

			this.mainContent().html(this.subview.render().$el);

			var links = this.navigationLinks();

			links.each(function(index, link) {
				if (link.id == that.currentStep) {
					$(link).removeClass("disabled");
					$(link).addClass("active");
				} else {
					$(link).removeClass("active");
					$(link).addClass("disabled");
				}
			});
		},

		mainContent: function() {
			return $("#main-content");
		},

		navigationLinks: function() {
			return $("li.list-group-item");
		}
	});
});
