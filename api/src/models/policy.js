var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PolicySchema = new Schema({
	policyNumber: String,
	firstName: String,
	lastName: String,
	validDate: Date,
	expirationDate: Date
});

PolicySchema.methods.valid = function() {
	if (!this.policyNumber || !this.firstName || !this.lastName || !this.validDate) {
		return false;
	}

	if (this.expirationDate && this.expirationDate <= this.validDate) {
		return false;
	}

	return true;
}

// Create a copy of the object with the generated properties (_id, __rev)
// from Mongoose removed.
PolicySchema.methods.toBasic = function() {
	var copy = {
		policyNumber: this.policyNumber,
		firstName: this.firstName,
		lastName: this.lastName,
		validDate: this.validDate,
		expirationDate: this.expirationDate,
	}
	return copy;
};

module.exports = mongoose.model("Policy", PolicySchema);
