
var configs = (function () {
	return {
		LINKEDIN_API_HOST: 'api.linkedin.com',
		LINKEDIN_API_PATH: '/v1/people/',
		AUTH_TOKEN: process.env.TOKEN || '0L3YzLe35PbwgHb61cUwRhWgWfOVBAWXGTzj',
		INPUT: process.env.INPUT || './input.csv',
		OUTPUT: process.env.OUTPUT || './output.csv'
	};

})();

module.exports = configs;

