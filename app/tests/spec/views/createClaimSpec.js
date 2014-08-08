define(["views/createClaim", "workflows/createClaim"], function( CreateClaimView, CreateClaim ){

	describe("View :: CreateClaim", function() {

		describe("initialize", function() {
			var model;
			beforeEach(function() {
				model = new CreateClaim();
			});

			it("loads a template", function() {
				var view = new CreateClaimView({model:model});
				expect(typeof view.template).toBe("function");
			});
		});
	});
});
