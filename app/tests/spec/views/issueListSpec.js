define(["views/issueList", "models/issueList", "models/issue"], function( IssueListView, IssueList, Issue ){

	describe("View :: IssueList", function() {

		describe("render", function() {
			var collection;
			var view;
			beforeEach(function() {
				collection = new IssueList();
				collection.push(new Issue());
				collection.push(new Issue());
				view = new IssueListView({collection:collection});
			});

			it("loads nothing when there no models in the collection", function() {
				collection.reset();

				view.render();
				var rendered = $(view.el).html();

				expect(rendered).toBe("");
			});

			it("puts content into the element when models are in collection", function() {
				view.render();
				var rendered = $(view.el).html();

				expect(rendered).not.toBe("");
			});

			it("loads subviews", function() {
				view.render();

				expect(view.subviews.length).toBe(2);
			});

			it("loads models into the subviews", function() {
				view.render();

				expect(collection.at(0)).toBe(view.subviews[0].model);
				expect(collection.at(1)).toBe(view.subviews[1].model);
			});
		});

		describe("updateModelFromView", function() {
			var collection;
			var view;
			beforeEach(function() {
				collection = new IssueList();
				collection.push(new Issue());
				collection.push(new Issue());
				view = new IssueListView({collection:collection});
				view.render();
			});

			it("copies the values for each subview", function() {
				$(view.subviews[0].el).find("#title").val("A");
				$(view.subviews[1].el).find("#title").val("Z");

				view.updateModelFromView();

				expect(view.subviews[0].model.get("title")).toBe("A");
				expect(view.subviews[1].model.get("title")).toBe("Z");
			});
		});

		describe("addIssue", function() {
			var collection;
			var view;
			beforeEach(function() {
				collection = new IssueList();
				view = new IssueListView({collection:collection});
				view.render();
			});

			it("should add an issue to the underlying model collection", function() {
				view.addIssue();

				expect(collection.length).toBe(1);
			});

			it("should add an issue to the issue list view", function() {
				view.addIssue();

				expect(view.subviews.length).toBe(1);
			});
		});
	});
});
