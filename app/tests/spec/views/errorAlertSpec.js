define(["views/errorAlert"], function( ErrorAlertView ){

	describe("View :: ErrorAlert", function() {

		describe("initialize", function() {
			var model = "Message";

			it("loads a template", function() {
				var view = new ErrorAlertView({model:model});
				expect(typeof view.template).toBe("function");
			});
		});

		describe("render", function() {
			var model = "Message";
			var view;
			beforeEach(function() {
				view = new ErrorAlertView({model:model});
			});

			it("puts content into the element", function() {
				view.render();
				var rendered = $(view.el).html();

				expect(rendered).not.toBe("");
			});
		});
	});
});
