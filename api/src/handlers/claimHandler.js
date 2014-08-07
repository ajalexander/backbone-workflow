var Claim = require("../models/claim")
var Policy = require("../models/policy")
var Common = require("./common");

function getAll(request, response) {
	Claim.find(function(err, claims) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(Common.toBasicCollection(claims));
		}
	});
}

function get(request, response) {
	Claim.findOne({"claimNumber": request.params.claimNumber}, function(err, claim) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(claim.toBasic());
		}
	});
}

function insert(request, response) {
	var claim = new Claim();

	claim.claimNumber = generateId();
	claim.description = request.body.description;
	claim.issues = request.body.issues;
	claim.policyNumber = request.body.policyNumber;

	if (!claim.valid()) {
		response.status(400).send("Some required fields are missing");
	}
	else {
		var policyExistsCallback = function(error, data) {
			if (error) {
				response.status(400).send(error);
			} else if (!data) {
				response.status(400).send("Invalid policy");
			} else {
				claim.save(claimsaveCallback);
			}
		};
		var claimsaveCallback = function(error) {
			if (error) {
				response.status(400).send(error);
			} else {
				response.status(201).json(claim.toBasic());
			}
		};

		Policy.findOne({"policyNumber": claim.policyNumber}, policyExistsCallback);;
	}
}

function search(request, response) {
	var searchObject = request.body;

	Claim.find(searchObject, function(err, claims) {
		if (err) {
			response.status(400).send(err);
		}
		else {
			response.json(Common.toBasicCollection(claims));
			console.log("Found %d records", claims.length);
		}
	});
}

// Generate a random alphanumeric string
function generateId() {
	return Math.random().toString(36).slice(2).toUpperCase();
}

exports.getAll = getAll
exports.get = get
exports.insert = insert
exports.search = search
