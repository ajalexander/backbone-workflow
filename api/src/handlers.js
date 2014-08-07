var PolicyHandler = require("./handlers/policyHandler");
var ClaimHandler = require("./handlers/claimHandler");

function setupHandlers(router) {
	router.get("/", function(request, response) {
		response.json({ message: "Welcome to the API" });
	});

	router.get("/policies", function(request, response) {
		PolicyHandler.getAll(request, response);
	});
	router.get("/policies/:policyNumber", function(request, response) {
		PolicyHandler.get(request, response);
	});
	router.post("/policies/search", function(request, response) {
		PolicyHandler.search(request, response);
	});
	
	router.get("/claims", function(request, response) {
		ClaimHandler.getAll(request, response);
	});
	router.get("/claims/:claimNumber", function(request, response) {
		ClaimHandler.get(request, response);
	});
	router.post("/claims", function(request, response) {
		ClaimHandler.insert(request, response);
	});
	router.post("/claims/search", function(request, response) {
		ClaimHandler.search(request, response);
	});
}

exports.setupHandlers = setupHandlers
