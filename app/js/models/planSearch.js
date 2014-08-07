define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone");

	return Backbone.Model.extend({
		defaults: {
			policyNumber: "",
			firstName: "",
			lastName: ""
		},

		initialize: function(attributes, options) {
			if (options) {
				this.workflow = options.workflow;
			}
		},

		search: function(errorCallback) {
			var that = this;

			var searchModel = {};
			if (this.get("policyNumber")) {
				searchModel.policyNumber = this.get("policyNumber");
			}
			if (this.get("firstName")) {
				searchModel.firstName = this.get("firstName");
			}
			if (this.get("lastName")) {
				searchModel.lastName = this.get("lastName");
			}

			if (!searchModel.policyNumber && !searchModel.firstName && !searchModel.lastName) {
				errorCallback("At least one search criteria is required.");
				return;
			}

			$.ajax({
				url: SERVICE_API + "policies/search",
				type: "POST",
				data: JSON.stringify(searchModel),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					if (!data || data.length == 0) {
						errorCallback("No policies found with the search criteria.");
					} else if (data.length > 1) {
						errorCallback("Found more than one policy with the search criteria.");
					} else {
						that.workflow.next(data[0]);
					}
				},
				error: function(e){
					errorCallback(e.responseText || "An error occurred.");
				}
			});
		}
	});
});
