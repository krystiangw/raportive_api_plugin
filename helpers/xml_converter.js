var parseString = require('xml2js').parseString;
var q = require('q');

var logger = require('./logger.js');


var xmlConverter = (function () {
	return {
		convert: convert
	};

	function convert(input) {
		var deferred = q.defer();
		var cleanedString = input.replace("\ufeff", "").replace("undefined", "");
		parseString(cleanedString, function (err, results) {
			if (err) {
				logger.error('xml converting error' + err);
				deferred.reject(err);
			}
		    deferred.resolve(JSON.parse(JSON.stringify(results)));
		});
		return deferred.promise;
	};
})();


module.exports = xmlConverter;