define(["models/planSearch", "app/service"], function( PlanSearch ){
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
				jasmine.Ajax.install();

				options = {
					workflow: {
						next: function() {}
					}
				};
				model = new PlanSearch({
					policyNumber: "PL123",
					firstName: "John",
					lastName: "Doe"
				}, options);
			});

			afterEach(function() {
				jasmine.Ajax.uninstall();
			});

			it("should return an error when no search terms are specified", function() {
				model.set({policyNumber: null});
				model.set({firstName: null});
				model.set({lastName: null});

				var message;
				model.search(function(error) {
					message = error;
				});
				expect(message).toBe("At least one search criteria is required.");
			});

			it("should build the correct search model", function() {
				model.search(function() {});

				var expectedRequestData = {
					policyNumber: "PL123",
					firstName: "John",
					lastName: "Doe"
				};

				request = jasmine.Ajax.requests.mostRecent();
				expect(request.url).toBe(SERVICE_API + "policies/search");
				expect(request.data()).toEqual(expectedRequestData);
			});


			it("should call the next step in the workflow when one result found", function() {
				model.search(function() {});

				spyOn(model.workflow, "next");

				request = jasmine.Ajax.requests.mostRecent();

				jasmine.Ajax.requests.mostRecent().response({
					"status": 200,
					"contentType": "text/plain",
					"responseText": "[{}]"
				});

				expect(model.workflow.next.calls.count()).toBe(1);
			});

			it("should return an error message when no results found", function() {
				var message
				model.search(function(error) {
					message = error;
				});

				request = jasmine.Ajax.requests.mostRecent();

				jasmine.Ajax.requests.mostRecent().response({
					"status": 200,
					"contentType": "text/plain",
					"responseText": "[]"
				});

				expect(message).toEqual("No policies found with the search criteria.");
			});

			it("should return an error message when more than one result found", function() {
				var message
				model.search(function(error) {
					message = error;
				});

				request = jasmine.Ajax.requests.mostRecent();

				jasmine.Ajax.requests.mostRecent().response({
					"status": 200,
					"contentType": "text/plain",
					"responseText": "[{},{}]"
				});

				expect(message).toEqual("Found more than one policy with the search criteria.");
			});

			it("should return a default error message when no error response text exists", function() {
				var message
				model.search(function(error) {
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
				model.search(function(error) {
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
