define(["models/confirmation"], function( Confirmation ){
	describe("Model :: Confirmation", function() {

		describe("initialize", function() {
			var options;
			
			beforeEach(function() {
				options = {
					claim: {
						claimNumber: "CL987",
						description: "A Claim"
					},
					workflow: "test"
				};
			});

			it("should copy the workflow from options", function() {
				var model = new Confirmation({}, options);

				expect(model.workflow).toBe(options.workflow);
			});

			it("should copy the claimNumber from claim into the model", function() {
				var model = new Confirmation({}, options);

				expect(model.get("claimNumber")).toBe(options.claim.claimNumber);
			});

			it("should copy the description from claim into the model", function() {
				var model = new Confirmation({}, options);

				expect(model.get("description")).toBe(options.claim.description);
			});
		});
	});
});
