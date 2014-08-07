define(function (require) {

	"use strict";

	var $ = require("jquery"),
		Backbone = require("backbone");

	return Backbone.Model.extend({
		initialize: function(attributes, options) {
			if (options) {
				this.set({"claimNumber": options.claim.claimNumber});
				this.set({"description": options.claim.description});

				this.workflow = options.workflow;
				this.claim = options.claim;
			}
		}
	});
});
