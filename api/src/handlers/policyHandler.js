var Policy = require("../models/policy")
var Common = require("./common");

function getAll(request, response) {
	Policy.find(function(err, policies) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(Common.toBasicCollection(policies));
		}
	});
}

function get(request, response) {
	Policy.findOne({"policyNumber": request.params.policyNumber}, function(err, policy) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(policy.toBasic());
		}
	});
}

function search(request, response) {
	var searchObject = request.body;

	if (searchObject.validDate) {
		searchObject.validDate = new Date(searchObject.validDate);
	}

	if (searchObject.expirationDate) {
		searchObject.expirationDate = new Date(searchObject.expirationDate);
	}

	Policy.find(searchObject, function(err, policies) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(Common.toBasicCollection(policies));
			console.log("Found %d records", policies.length);
		}
	});
}

exports.getAll = getAll
exports.get = get
exports.search = search
