define(["models/issues", "models/issue", "app/service"], function( Issues, Issue ){
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

		describe("create", function() {
			var options;
			var model;
			
			beforeEach(function() {
				jasmine.Ajax.install();

				options = {
					policy: {
						policyNumber: "PL123"
					},
					workflow: {
						next: function() {}
					}
				};
				model = new Issues({
					description: "Description"
				}, options);

				model.get("issues").reset();
				model.get("issues").push(new Issue({
					title: "Issue 1",
					description: "An issue"
				}));
				model.get("issues").push(new Issue({
					title: "Issue 2",
					description: "Another issue"
				}));
			});

			afterEach(function() {
				jasmine.Ajax.uninstall();
			});

			it("should build the correct claim model", function() {
				model.create(function() {});

				var expectedRequestData = {
					description: "Description",
					policyNumber: "PL123",
					issues: [
						{ title: "Issue 1", description: "An issue"},
						{ title: "Issue 2", description: "Another issue"}
					]
				};

				request = jasmine.Ajax.requests.mostRecent();
				expect(request.url).toBe(SERVICE_API + "claims");
				expect(request.data()).toEqual(expectedRequestData);
			});

			it("should call the next step in the workflow when one result found", function() {
				model.create(function() {});

				spyOn(model.workflow, "next");

				request = jasmine.Ajax.requests.mostRecent();

				jasmine.Ajax.requests.mostRecent().response({
					"status": 200,
					"contentType": "text/plain",
					"responseText": "{}"
				});

				expect(model.workflow.next.calls.count()).toBe(1);
			});

			it("should return a default error message when no error response text exists", function() {
				var message
				model.create(function(error) {
					message = error;
				});

				request = jasmine.Ajax.requests.mostRecent();

				jasmine.Ajax.requests.mostRecent().response({
					"status": 400,
					"contentType": "text/plain",
					"responseText": ""
				});

				expect(message).toEqual("An error occurred.");
			});

			it("should return the specified error message when the error response text exists", function() {
				var message
				model.create(function(error) {
					message = error;
				});

				request = jasmine.Ajax.requests.mostRecent();

				jasmine.Ajax.requests.mostRecent().response({
					"status": 400,
					"contentType": "text/plain",
					"responseText": "Error"
				});

				expect(message).toEqual("Error");
			});
		});
	});
});
