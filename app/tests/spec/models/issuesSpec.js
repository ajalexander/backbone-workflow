define(["models/issues"], function( Issues ){
	describe("Model :: Issues", function() {

		describe("initialize", function() {
			var options;
			
			beforeEach(function() {
				options = {
					policy: {
						policyNumber: "PL123",
						firstName: "John",
						lastName: "Doe"
					},
					workflow: "test"
				};
			});

			it("should copy the policy from options", function() {
				var model = new Issues({}, options);

				expect(model.policy).toBe(options.policy);
			});

			it("should copy the workflow from options", function() {
				var model = new Issues({}, options);

				expect(model.workflow).toBe(options.workflow);
			});

			it("should copy the firstName from policy into the model", function() {
				var model = new Issues({}, options);

				expect(model.get("firstName")).toBe(options.policy.firstName);
			});

			it("should copy the lastName from policy into the model", function() {
				var model = new Issues({}, options);

				expect(model.get("lastName")).toBe(options.policy.lastName);
			});

			it("should copy the policyNumber from policy into the model", function() {
				var model = new Issues({}, options);

				expect(model.get("policyNumber")).toBe(options.policy.policyNumber);
			});

			it("should create one issue", function() {
				var model = new Issues({}, options);

				expect(model.get("issues").models.length).toBe(1);
			});
		});
	});
});
