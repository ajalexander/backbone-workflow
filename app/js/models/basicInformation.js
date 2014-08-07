define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone");

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
		},

		advance: function(errorCallback) {
			this.workflow.next({
				policy: this.policy,
				description: this.get("description")
			});
		}
	});
});
