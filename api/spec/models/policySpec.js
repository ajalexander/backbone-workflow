var Policy = require("../../src/models/policy");

describe("Policy", function() {
	describe("valid", function() {
		var policy;

		beforeEach(function() {
			policy = new Policy();
			policy.policyNumber = "PL98765";
			policy.firstName = "John";
			policy.lastName = "Doe";
			policy.validDate = new Date(2014, 00, 01);
			policy.expirationDate = new Date(2014, 11, 31);
		});

		it("should be true when all fields are present", function() {
			expect(policy.valid()).toBe(true);
		});

		it("should be false when the policyNumber field is missing", function() {
			policy.policyNumber = null;
			expect(policy.valid()).toBe(false);
		});

		it("should be false when the firstName field is missing", function() {
			policy.firstName = null;
			expect(policy.valid()).toBe(false);
		});

		it("should be false when the lastName field is missing", function() {
			policy.lastName = null;
			expect(policy.valid()).toBe(false);
		});

		it("should be false when the validDate field is missing", function() {
			policy.validDate = null;
			expect(policy.valid()).toBe(false);
		});

		it("should be false when the expirationDate field is before validDate", function() {
			policy.expirationDate = new Date(1980, 00, 01);
			expect(policy.valid()).toBe(false);
		});

		it("should be false when the expirationDate field is the same as validDate", function() {
			policy.expirationDate = policy.validDate;
			expect(policy.valid()).toBe(false);
		});
	});

	describe("toBasic", function() {
		var policy;

		beforeEach(function() {
			policy = new Policy();
			policy._id = 123;
			policy.__rev = 2;
			policy.policyNumber = "PL98765";
			policy.firstName = "John";
			policy.lastName = "Doe";
			policy.validDate = new Date(2014, 00, 01);
			policy.expirationDate = new Date(2014, 11, 31);
		});

		it("should have normal fields copied", function() {
			var copy = policy.toBasic();

			expect(copy.policyNumber).toBe(policy.policyNumber);
			expect(copy.firstName).toBe(policy.firstName);
			expect(copy.lastName).toBe(policy.lastName);
			expect(copy.validDate).toBe(policy.validDate);
			expect(copy.expirationDate).toBe(policy.expirationDate);
		});

		it("should have Mongoose fields removed", function() {
			var copy = policy.toBasic();

			expect(copy._id).toBe(undefined);
			expect(copy.__rev).toBe(undefined);
		});
	});
});
