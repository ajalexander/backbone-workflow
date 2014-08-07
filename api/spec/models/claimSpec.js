var Claim = require("../../src/models/claim");

describe("Claim", function() {
	describe("valid", function() {
		var claim;

		beforeEach(function() {
			claim = new Claim();
			claim.claimNumber = "CL12345";
			claim.description = "This is a claim";
			claim.policyNumber = "PL98765";

			claim.issues.push({ title: "First Issue", description: "A problem" });
			claim.issues.push({ title: "Second Issue", description: "Another problem" });
		});

		it("should be true when all fields are present", function() {
			expect(claim.valid()).toBe(true);
		});

		it("should be false when the claimNumber field is missing", function() {
			claim.claimNumber = null;
			expect(claim.valid()).toBe(false);
		});

		it("should be false when the description field is missing", function() {
			claim.description = null;
			expect(claim.valid()).toBe(false);
		});

		it("should be false when the policyNumber field is missing", function() {
			claim.policyNumber = null;
			expect(claim.valid()).toBe(false);
		});

		it('should be false when issues is missing', function() {
			claim.issues = null;
			expect(claim.valid()).toBe(false);
		});

		it('should be false when too few issues', function() {
			claim.issues.remove(claim.issues[1]);
			claim.issues.remove(claim.issues[0]);
			expect(claim.valid()).toBe(false);
		});

		it('should be false when issue is missing title', function() {
			claim.issues[0].title = null;
			expect(claim.valid()).toBe(false);
		});

		it('should be false when issue is missing description', function() {
			claim.issues[0].description = null;
			expect(claim.valid()).toBe(false);
		});
	});

	describe("toBasic", function() {
		var claim;

		beforeEach(function() {
			claim = new Claim();
			claim._id = 123;
			claim.__rev = 2;
			claim.claimNumber = "CL12345";
			claim.description = "This is a claim";
			claim.policyNumber = "PL98765";

			claim.issues.push({
				_id: 456,
				__rev: 3,
				title: "Issue",
				description: "A problem"
			});
		});

		it("should have normal fields copied", function() {
			var copy = claim.toBasic();

			expect(copy.claimNumber).toBe(claim.claimNumber);
			expect(copy.description).toBe(claim.description);
			expect(copy.policyNumber).toBe(claim.policyNumber);
		});

		it("should have normal fields copied for children", function() {
			var copy = claim.toBasic();

			expect(copy.issues.length).toBe(1);

			expect(copy.issues[0].title).toBe(claim.issues[0].title);
			expect(copy.issues[0].description).toBe(claim.issues[0].description);
		});

		it("should have Mongoose fields removed", function() {
			var copy = claim.toBasic();

			expect(copy._id).toBe(undefined);
			expect(copy.__rev).toBe(undefined);
		});

		it("should have Mongoose fields removed from children", function() {
			var copy = claim.toBasic();

			expect(copy.issues[0]._id).toBe(undefined);
			expect(copy.issues[0].__rev).toBe(undefined);
		});
	});
});
