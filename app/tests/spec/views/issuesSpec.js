define(["views/issues", "models/issues"], function( IssuesView, Issues ){

	describe("View :: Issues", function() {

		describe("initialize", function() {
			var model;
			beforeEach(function() {
				model = new Issues();
			});

			it("loads a template", function() {
				var view = new IssuesView({model:model});
				expect(typeof view.template).toBe("function");
			});
		});

		describe("render", function() {
			var model;
			var view;
			beforeEach(function() {
				model = new Issues();
				view = new IssuesView({model:model});
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
				model = new Issues();
				view = new IssuesView({model:model});
				view.render();
			});

			it("copies the values from the DOM", function() {
				$(view.issuesView.subviews[0].el).find("#title").val("Title");

				view.updateModelFromView();

				expect(model.get("issues").at(0).get("title")).toBe("Title");
			});
		});

		describe("addIssue", function() {
			var model;
			var view;
			var e = {
				preventDefault: function(){}
			};
			beforeEach(function() {
				model = new Issues();
				view = new IssuesView({model:model});
				view.render();
			});

			it("should add an issue to the underlying model collection", function() {
				view.addIssue(e);

				expect(model.get("issues").length).toBe(2);
			});

			it("should add an issue to the issue list view", function() {
				view.addIssue(e);

				expect(view.issuesView.subviews.length).toBe(2);
			});
		});
	});
});
