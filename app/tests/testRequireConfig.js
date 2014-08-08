require.config({
	baseUrl: "../lib",

	paths: {
		// Paths to testing components
		spec: "../tests/spec",

		// Paths to testing libraries
		jasmine: "../tests/lib/jasmine/jasmine",
		"jasmine-html": "../tests/lib/jasmine/jasmine-html",
		boot: "../tests/lib/jasmine/boot"
	},

	shim: {
		jasmine: {
			exports: "jasmine"
		},
		"jasmine-html": {
			deps: ["jasmine"],
			exports: "jasmine"
		},
		boot: {
			deps: ["jasmine", "jasmine-html"],
			exports: "jasmine"
		}
	}
});
