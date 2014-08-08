var specs = [
	// Models
	"spec/models/basicInformationSpec",
	"spec/models/confirmationSpec",
	"spec/models/issuesSpec",
	"spec/models/planSearchSpec",

	// Views
	"spec/views/basicInformationSpec",
	"spec/views/createClaimSpec",
	"spec/views/errorAlertSpec",
	"spec/views/issueListSpec",
	"spec/views/issueSpec",
	"spec/views/issuesSpec",
	"spec/views/planSearchSpec",

	// Workflows
	"spec/workflows/createClaimSpec",
];

require(["../js/appRequireConfig.js"], function() {
	require(["./testRequireConfig.js"], function() {
		require(["boot", "mock-ajax"], function () {
			// Load the specs
			require(specs, function () {
				// Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
				window.onload();
			});
		});
	})
});
