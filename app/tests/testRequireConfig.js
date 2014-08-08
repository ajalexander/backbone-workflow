require.config({
	baseUrl: "../lib",

	paths: {
		// Paths to testing components
		spec: "../tests/spec",

		// Paths to testing libraries
		jasmine: "../tests/lib/jasmine/jasmine",
		"jasmine-html": "../tests/lib/jasmine/jasmine-html",
		boot: "../tests/lib/jasmine/boot",
		"mock-ajax": "../tests/lib/jasmine/mock-ajax"
	},

	shim: {
		jasmine: {
			exports: "jasmine"
		},
		"jasmine-html": {
			deps: ["jasmine"],
			exports: "jasmine"
		},
		"mock-ajax": {
			deps: ["boot"],
			exports: "jasmine"
		},
		boot: {
			deps: ["jasmine", "jasmine-html"],
			exports: "jasmine"
		}
	}
});
