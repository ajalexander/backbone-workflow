define(["models/planSearch"], function( PlanSearch ){
	describe("Model :: PlanSearch", function() {

		describe("initialize", function() {
			var options;
			
			beforeEach(function() {
				options = { workflow: "test" };
			});

			it("should copy the workflow from options", function() {
				var model = new PlanSearch({}, options);

				expect(model.workflow).toBe(options.workflow);
			});
		});

		describe("search", function() {
			var options;
			var model;
			
			beforeEach(function() {
				options = {};
				model = new PlanSearch({}, options);
			});

			it("should return an error when no search terms are specified", function() {
				var message;
				model.search(function(error) {
					message = error;
				});
				expect(message).toBe("At least one search criteria is required.");
			});
		});
	});
});
