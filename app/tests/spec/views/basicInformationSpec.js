define(["views/basicInformation", "models/basicInformation"], function( BasicInformationView, BasicInformation ){

	describe("View :: BasicInformation", function() {

		describe("initialize", function() {
			var model;
			beforeEach(function() {
				model = new BasicInformation();
			});

			it("loads a template", function() {
				var view = new BasicInformationView({model:model});
				expect(typeof view.template).toBe("function");
			});
		});

		describe("render", function() {
			var model;
			var view;
			beforeEach(function() {
				model = new BasicInformation();
				view = new BasicInformationView({model:model});
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
				model = new BasicInformation();
				view = new BasicInformationView({model:model});
				view.render();
			});

			it("copies the values from the DOM", function() {
				$(view.el).find("#description").val("Problem");

				view.updateModelFromView();

				expect(model.get("description")).toBe("Problem");
			});
		});
	});
});
