require.config({

	baseUrl: "lib",

	paths: {
		// Paths to application components
		app: "../js",
		models: "../js/models",
		templates: "../templates",
		views: "../js/views",
		workflows: "../js/workflows",

		// Paths to libraries
		backbone: "backbone/backbone",
		bootstrap: "bootstrap/js/bootstrap",
		jquery: "jquery/jquery",
		handlebars: "handlebars/handlebars",
		jquery: "jquery/jquery",
		text: "text/text",
		underscore: "underscore/underscore"
	},

	// Shim in libraries that do not natively work with Require.js
	shim: {
		"backbone": {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		"handlebars": {
			exports: "Handlebars"
		},
		"bootstrap": {
			deps: ["jquery"],
		}
	}
});
