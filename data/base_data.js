policyWithClaims = {
	policyNumber: "H573LP9SENX9A4I",
	firstName: "John",
	lastName: "Doe",
	startDate: new ISODate("2014-01-01"),
	expirationDate: new ISODate("2014-12-31")
};
db.policies.insert(policyWithClaims);

policyWithoutClaims = {
	policyNumber: "XHUBKQZKOZ85MI",
	firstName: "Janet",
	lastName: "Jones",
	startDate: new ISODate("2014-07-24"),
	expirationDate: new ISODate("2014-10-24")
};
db.policies.insert(policyWithoutClaims);

policyWithoutExpiration = {
	policyNumber: "00000000000000",
	firstName: "Robert",
	lastName: "Smith",
	startDate: new ISODate("2014-08-01"),
	expirationDate: new ISODate("2025-07-31")
};
db.policies.insert(policyWithoutExpiration);

claim = {
	claimNumber: "RWBDWT9DKY9442T9",
	description: "Property loss",
	policyNumber: policyWithClaims.policyNumber,
	issues: [
		{ title: "Physical Damage", description: "The radiator exploded" }
	]
};
db.claims.insert(claim);

