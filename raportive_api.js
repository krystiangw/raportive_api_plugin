var configs = require('./configs.js');
var https = require('https');
var q = require('q');

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

	function get(params) {
		var deferred = q.defer();

		var path = configs.LINKEDIN_API_PATH + params.key + '=' + encodeURIComponent(params.value);
		var options = {
			host: configs.LINKEDIN_API_HOST,
			path: path,
			headers: {
				'oauth_token': configs.AUTH_TOKEN
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
					message: '404: no valid '+ params.key + ' found under: ' + params.value
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

