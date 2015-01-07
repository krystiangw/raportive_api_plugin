var Converter=require("csvtojson").core.Converter;
var json2csv = require('json2csv');
var fs = require('fs');
var q = require('q');

var logger = require('./logger.js');
var configs = require('./../configs.js');


var csvHelper = (function () {
	return {
		saveToCSV: saveToCSV,
		readfromCSV: readfromCSV,
	};

	function saveToCSV(data) {
		var path = configs.OUTPUT;
		json2csv({data: data, fields: ['email', 'first-name', 'last-name', 'headline']}, function(err, csv) {
			if (err) logger.error({message: 'Unable to covert data to csv'});
			if (fs.existsSync(path)) {
				fs.appendFile(path, csv, function (err) {
				    if(err) {
				        logger.error({message: 'Unable to save file'});
				    } else {
				        logger.info({message: 'Succesfully saved data for ' + data.email});
				    }
				});
			} else {
				fs.writeFile(path, csv, function(err) {
				    if(err) {
				        logger.error({message: 'Unable to save file'});
				    } else {
				        logger.info({message: 'Succesfully saved data for ' + data.email});
				    }
				}); 
			}
				
		});
	};

	function readfromCSV(path){
		var deferred = q.defer();

		var fileStream = fs.createReadStream(path);
		//new converter instance
		var csvConverter = new Converter({constructResult:true});
		
		//end_parsed will be emitted once parsing finished
		csvConverter.on("end_parsed",function(jsonObj){
			deferred.resolve(jsonObj);
		});

		//read from file
		fileStream.pipe(csvConverter);

		return deferred.promise;
	};


})();

module.exports = csvHelper;


