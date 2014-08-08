define(
	["workflows/createClaim", "views/planSearch", "views/basicInformation", "views/issues", "views/confirmation"],
	function( CreateClaim, PlanSearchView, BasicInformationView, IssuesView, ConfirmationView ){

	describe("Workflow :: CreateClaim", function() {

		describe("initialize", function() {
			it("should set the current index to -1", function() {
				var model = new CreateClaim();

				expect(model.currentIndex).toBe(-1);
			});
		});

		describe("start", function() {
			var workflow;
			
			beforeEach(function() {
				workflow = new CreateClaim();
			});

			it("should advance to the first step", function() {
				var called = false;

				workflow.workflowOrder = ["testingFirst", "testingSecond"];
				workflow.testingFirst = function(data) {
					called = true;
				};

				workflow.start();

				expect(called).toBe(true);
			});

			it("should pass the data to the first step", function() {
				var passedData = null;

				workflow.workflowOrder = ["testingFirst", "testingSecond"];
				workflow.testingFirst = function(data) {
					passedData = data;
				};

				workflow.start(100);

				expect(passedData).toBe(100);
			});
		});

		describe("next", function() {
			var workflow;
			
			beforeEach(function() {
				workflow = new CreateClaim();
			});

			it("should advance the step index", function() {
				workflow.workflowOrder = ["testingFirst", "testingSecond"];
				workflow.currentIndex = 0;
				workflow.testingSecond = function(data) {};

				workflow.next();

				expect(workflow.currentIndex).toBe(1);
			});

			it("should update the step", function() {
				workflow.workflowOrder = ["testingFirst", "testingSecond"];
				workflow.currentIndex = 0;
				workflow.testingSecond = function(data) {};

				workflow.next();

				expect(workflow.currentStep).toBe("testingSecond");
			});

			it("should call the step", function() {
				var called = false;

				workflow.workflowOrder = ["testingFirst", "testingSecond"];
				workflow.currentIndex = 0;
				workflow.testingSecond = function(data) {
					called = true;
				};

				workflow.next();

				expect(called).toBe(true);
			});

			it("should pass the data to the step", function() {
				var passedData = null;

				workflow.workflowOrder = ["testingFirst", "testingSecond"];
				workflow.currentIndex = 0;
				workflow.testingSecond = function(data) {
					passedData = data;
				};

				workflow.next(100);

				expect(passedData).toBe(100);
			});
		});

		describe("steps", function() {
			var workflow;
			var mainContent;

			beforeEach(function() {
				mainContent = $("<div/>");
				workflow = new CreateClaim();
				workflow.mainContent = function() { return mainContent; }
			});

			describe("planSearch", function() {
				var data;
				beforeEach(function() {
					data = {};
				});

				it("should update the view", function() {
					workflow.planSearch(data);

					expect(workflow.subview).not.toBe(null);
					expect(workflow.subview).not.toBe(undefined);
				});

				it("should render the view", function() {
					workflow.planSearch(data);
					
					expect(mainContent.html()).not.toBe("");
				});

				it("should create a view of the correct type", function() {
					workflow.planSearch(data);

					expect(workflow.subview instanceof PlanSearchView).toBe(true);
				});

				it("should pass options to the model", function() {
					workflow.planSearch(data);

					expect(workflow.subview.model.workflow).toBe(workflow);
				});
			});

			describe("basicInformation", function() {
				var data;
				beforeEach(function() {
					data = {
						policyNumber: "PL123"
					};
				});

				it("should update the view", function() {
					workflow.basicInformation(data);

					expect(workflow.subview).not.toBe(null);
					expect(workflow.subview).not.toBe(undefined);
				});

				it("should render the view", function() {
					workflow.basicInformation(data);
					
					expect(mainContent.html()).not.toBe("");
				});

				it("should create a view of the correct type", function() {
					workflow.basicInformation(data);

					expect(workflow.subview instanceof BasicInformationView).toBe(true);
				});

				it("should pass options to the model", function() {
					workflow.basicInformation(data);

					expect(workflow.subview.model.workflow).toBe(workflow);
					expect(workflow.subview.model.policy).toBe(data);
				});
			});

			describe("issues", function() {
				var data;
				beforeEach(function() {
					data = {
						policy: {
							policyNumber: "PL123"
						},
						description: "Description"
					};
				});

				it("should update the view", function() {
					workflow.issues(data);

					expect(workflow.subview).not.toBe(null);
					expect(workflow.subview).not.toBe(undefined);
				});

				it("should render the view", function() {
					workflow.issues(data);
					
					expect(mainContent.html()).not.toBe("");
				});

				it("should create a view of the correct type", function() {
					workflow.issues(data);

					expect(workflow.subview instanceof IssuesView).toBe(true);
				});

				it("should pass options to the model", function() {
					workflow.issues(data);

					expect(workflow.subview.model.workflow).toBe(workflow);
					expect(workflow.subview.model.policy).toBe(data.policy);
				});
			});

			describe("confirmation", function() {
				var data;
				beforeEach(function() {
					data = {
						claimNumber: "CL987"
					};
				});

				it("should update the view", function() {
					workflow.confirmation(data);

					expect(workflow.subview).not.toBe(null);
					expect(workflow.subview).not.toBe(undefined);
				});

				it("should render the view", function() {
					workflow.confirmation(data);
					
					expect(mainContent.html()).not.toBe("");
				});

				it("should create a view of the correct type", function() {
					workflow.confirmation(data);

					expect(workflow.subview instanceof ConfirmationView).toBe(true);
				});

				it("should pass options to the model", function() {
					workflow.confirmation(data);

					expect(workflow.subview.model.workflow).toBe(workflow);
					expect(workflow.subview.model.claim).toBe(data);
				});
			});
		});
	});
});
