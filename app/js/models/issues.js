define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone"),
        Issue = require("models/issue"),
        IssueList = require("models/issueList");

	return Backbone.Model.extend({
		defaults: {
			description: ""
		},

		initialize: function(attributes, options) {
			if (options) {
				this.set({"policyNumber": options.policy.policyNumber});
				this.set({"firstName": options.policy.firstName});
				this.set({"lastName": options.policy.lastName});

				this.policy = options.policy;
				this.workflow = options.workflow;
			}

			var issues = new IssueList();
			issues.push(new Issue());

			this.set({issues: issues});
		},

		create: function(errorCallback) {
			var that = this;

			var claimModel = {
				description: this.get("description"),
				policyNumber: this.get("policyNumber"),
				issues: []
			};

			this.get("issues").each(function(issue) {
				claimModel.issues.push({
					title: issue.get("title"),
					description: issue.get("description")
				});
			});

			$.ajax({
				url: SERVICE_API + "claims",
				type: "POST",
				data: JSON.stringify(claimModel),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					that.workflow.next(data);
				},
				error: function(e){
					errorCallback(e.responseText || "An error occurred.");
				}
			});
		}
	});
});
