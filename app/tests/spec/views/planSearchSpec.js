define(["views/planSearch", "models/planSearch"], function( PlanSearchView, PlanSearch ){

	describe("View :: PlanSearch", function() {

		describe("initialize", function() {
			var model;
			beforeEach(function() {
				model = new PlanSearch();
			});

			it("loads a template", function() {
				var view = new PlanSearchView({model:model});
				expect(typeof view.template).toBe("function");
			});
		});

		describe("render", function() {
			var model;
			var view;
			beforeEach(function() {
				model = new PlanSearch();
				view = new PlanSearchView({model:model});
			});

			it("puts content into the element", function() {
				view.render();
				var rendered = $(view.el).html();

				expect(rendered).not.toBe("");
			});
		});

		describe("updateModelFromView", function() {
			var model;
			var view;
			beforeEach(function() {
				model = new PlanSearch();
				view = new PlanSearchView({model:model});
				view.render();
			});

			it("copies the values from the DOM", function() {
				$(view.el).find("#policyNumber").val("PL123");
				$(view.el).find("#firstName").val("John");
				$(view.el).find("#lastName").val("Doe");

				view.updateModelFromView();

				expect(model.get("policyNumber")).toBe("PL123");
				expect(model.get("firstName")).toBe("John");
				expect(model.get("lastName")).toBe("Doe");
			});
		});
	});
});
