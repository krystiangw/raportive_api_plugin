var https = require('https');
var q = require('q');

var configs = require('./../configs.js');


httpsConfig();

function httpsConfig() {
	var max = 1000;
	if(https.globalAgent.maxSockets < max) {
	    https.globalAgent.maxSockets = max;
	}
};

var raportiveApi = (function () {
	return {
		get: get
	};


	function get(path, AUTH_TOKEN){
		var deferred = q.defer();
		var base_path = configs.LINKEDIN_API_PATH;

		var options = {
			host: configs.LINKEDIN_API_HOST,
			path: base_path + path,
			headers: {
				'oauth_token': (configs.AUTH_TOKEN || AUTH_TOKEN)
			}
		};

		https.get(options, function(res) {
			if (res.statusCode === 200) {
				var body;
				
				res.on('data', function(chunk) {
					body += chunk;
				});
				res.on('end', function() {
					deferred.resolve(body);
				});

			} else if (res.statusCode === 404){
				deferred.reject({
					message: '404: no valid profile found'
				});
			} else if (res.statusCode === 401){
				deferred.reject({
					message: '401: unautharized connection. Check your AUTH TOKEN',
					statusCode: 401
				});
			}
			
		}).on('error', function(e) {
			deferred.reject({
				message: 'Error: ' + e
			});
		});

		return deferred.promise;

	};

})();

module.exports = raportiveApi;

