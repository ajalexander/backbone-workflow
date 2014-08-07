toBasicCollection = function(collection) {
	var results = [];
	for (var i = 0; i < collection.length; i++) {
		results.push(collection[i].toBasic());
	}
	return results;
}

exports.toBasicCollection = toBasicCollection;
