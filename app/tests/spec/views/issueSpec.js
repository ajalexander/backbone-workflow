define(["views/issue", "models/issue"], function( IssueView, Issue ){

	describe("View :: Issue", function() {

		describe("initialize", function() {
			var model;
			beforeEach(function() {
				model = new Issue();
			});

			it("loads a template", function() {
				var view = new IssueView({model:model});
				expect(typeof view.template).toBe("function");
			});
		});

		describe("render", function() {
			var model;
			var view;
			beforeEach(function() {
				model = new Issue();
				view = new IssueView({model:model});
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
				model = new Issue();
				view = new IssueView({model:model});
				view.render();
			});

			it("copies the values from the DOM", function() {
				$(view.el).find("#title").val("Title");
				$(view.el).find("#description").val("Description");

				view.updateModelFromView();

				expect(model.get("title")).toBe("Title");
				expect(model.get("description")).toBe("Description");
			});
		});
	});
});
