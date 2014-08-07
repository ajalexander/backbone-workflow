var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClaimIssueSchema = new Schema({
	title: String,
	description: String
});

var ClaimSchema = new Schema({
	claimNumber: String,
	description: String,
	issues: [ClaimIssueSchema],
	policyNumber: String
});

ClaimSchema.methods.valid = function() {
	if (!this.claimNumber || !this.description || !this.policyNumber) {
		return false;
	}

	if (!this.issues || this.issues.length < 1) {
		return false;
	}

	for (var i = 0; i < this.issues.length; i++) {
		if (!this.issues[i].title || !this.issues[i].description) {
			return false;
		}
	}

	return true;
}

// Create a copy of the object with the generated properties (_id, __rev)
// from Mongoose removed.
ClaimSchema.methods.toBasic = function() {
	var copy = {
		claimNumber: this.claimNumber,
		description: this.description,
		issues: [],
		policyNumber: this.policyNumber
	};
	for (var i = 0; i < this.issues.length; i++) {
		copy.issues.push({
			title: this.issues[i].title,
			description: this.issues[i].description
		})
	}
	return copy;
}

module.exports = mongoose.model("Claim", ClaimSchema);
