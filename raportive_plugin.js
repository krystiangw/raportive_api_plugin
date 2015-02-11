var q = require('q');

var raportiveApi = require('./helpers/raportive_api.js');
var emailsGenerator = require('./helpers/emails_generator.js');
var xmlConverter = require('./helpers/xml_converter.js');
var logger = require('./helpers/logger.js');
var csvHelper = require('./helpers/csv_helper.js');
var configs = require('./configs.js');

init();

function init(){
	var inputPath = configs.INPUT;
	var outputPath = configs.OUTPUT;

	getAllEmails(inputPath)
	.then(function(emails){

		getResults(emails)
		.then(function(){
			logger.info('Finished succesfully');
			process.exit(code=0);
		},function(err){
			logger.info(err);
			process.exit(code=1);
		});
	});
};

function getAllEmails(path) {
	var deferred = q.defer();

	var emails = [];
	csvHelper.readfromCSV(path)
	.then(function(jsonObj){
		jsonObj.forEach(function(profile){
			var profileEmails = emailsGenerator.generate(profile);
			emails = emails.concat(profileEmails);
		});
		deferred.resolve(emails);
	});
	return deferred.promise;
};

function getResults(emails) {
	var deferred = q.defer();
	var counter = emails.length;

	emails.forEach(function(email){
		var path = '/people/email=' + email;

		raportiveApi.get(path)
		.then(function(res){
			xmlConverter.convert(res)
			.then(function(convertedResults){
				convertedResults.email = email;
				csvHelper.saveToCSV(convertedResults);
				counter -= 1;
			if (counter === 0 ) {
				deferred.resolve();
			}
			});
		}, function(e){
			if (e.statusCode === 401) {
				deferred.reject(e.message);
			}
			
			counter -= 1;
			logger.info(e.message || 'Undefined');
			if (counter === 0 ) {
				deferred.resolve();
			}
		});
	});

	return deferred.promise;

};



