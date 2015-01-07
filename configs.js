
var configs = (function () {
	return {
		LINKEDIN_API_HOST: 'api.linkedin.com',
		LINKEDIN_API_PATH: '/v1/people/',
		AUTH_TOKEN: process.env.TOKEN || 'Fd3uIKJJ0SQK7265IFYYFP3AHF9MfsvL5O0u',
		INPUT: process.env.INPUT || './input.csv',
		OUTPUT: process.env.OUTPUT || './output.csv'
	};

})();

module.exports = configs;

