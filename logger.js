var logger = (function () {
	var bunyan = require('bunyan');
	return bunyan.createLogger({name: 'raportive_plugin'});
})();

module.exports = logger;
