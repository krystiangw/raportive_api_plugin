
var configs = (function () {
	return {
		LINKEDIN_API_HOST: 'api.linkedin.com',
		LINKEDIN_API_PATH: '/v1',
		AUTH_TOKEN: process.env.TOKEN,
		INPUT: process.env.INPUT || './input.csv',
		OUTPUT: process.env.OUTPUT || './output.csv'
	};

})();

module.exports = configs;

