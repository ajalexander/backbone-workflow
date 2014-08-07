define(function (require) {
	"use strict";

	var $ = require("jquery");
	Backbone = require("backbone");

	return Backbone.Router.extend({

		routes:{
			"": "createClaim",
			"createClaim": "createClaim"
		},

		createClaim: function () {
			var that = this;
			require(["views/createClaim", "workflows/createClaim"], 
				function (CreateClaimView, CreateClaimWorkflow) {
					var model = new CreateClaimWorkflow();
					that.loadWorkflow(new CreateClaimView({model:model}));
					model.start();
			});
		},

		loadWorkflow: function(view) {
			if (this.view) {
				this.view.remove();
			}
			this.view = view;
			$("#main-workflow").html(this.view.render().el);
		}
	});
});
