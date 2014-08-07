require(["./appRequireConfig"], function() {
	require(["jquery", "bootstrap"], function() {
		require(["backbone", "app/appRouter", "app/service"], function (Backbone, AppRouter) {
			app = new AppRouter();
			Backbone.history.start();
		});
	});
});
