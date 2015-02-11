var express = require('express');
var raportiveApi = require('./helpers/raportive_api.js');
var emailsGenerator = require('./helpers/emails_generator.js');
var xmlConverter = require('./helpers/xml_converter.js');
var logger = require('./helpers/logger.js');
var configs = require('./configs.js');
var q = require('q');

var app = express();
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address
  var port = server.address().port
});

app.session = {};


// expressjs API ponits
// '/profile?firstName=john&lastName=smith&domain=gmail.com'

app.get('/profile', function (req, res) {
    var emails = emailsGenerator.generate(req.query);
    if (!app.session['token']) {
        res.status(404).send('No token found');
    }
    processChecking(emails, {'AUTH_TOKEN': app.session['token']})
    .then(function(response){
        res.send(response);
    }, function(error){
        logger.error(error);
        res.status(404).send(error);
    });
    
});

app.get('/token', function (req, res) {
    if (req.query.set){
        app.session['token'] = req.query.set;
        res.send('Token changed to: ' + app.session['token']);
    } else if (app.session['token']) {
        res.send('Current token: ' + app.session['token']);
    } else {
        res.status(404).send('No token found');
    } 
});

app.get('/:path*', function (req, res) {
    var AUTH_TOKEN = app.session['token']

    if (!AUTH_TOKEN) {
        res.status(404).send('No token found');
    }

    raportiveApi.get(req.originalUrl, AUTH_TOKEN)
    .then(function(response){
        xmlConverter.convert(response)
        .then(function(convertedResults){
            res.send(convertedResults);
        });

    }, function(error){
        res.status(404).send(error);
    });
});



function processChecking(emails, options) {
    var deferred = q.defer();
    var counter = emails.length;
    var results = [];

    emails.forEach(function(email){
        var path = '/people/email=' + email;

        raportiveApi.get(path, options['AUTH_TOKEN'])
        .then(function(res){
            xmlConverter.convert(res)
            .then(function(convertedResults){
                convertedResults.email = email;
                results.push(convertedResults);
                counter -= 1;
                if (counter === 0 ) {
                    deferred.resolve(results);
                }
            });

        }, function(e){
            if (e.statusCode === 401) {
                deferred.reject(e.message);
            }
            counter -= 1;
            logger.info(e.message || 'Undefined');
            if (counter === 0 ) {
                deferred.resolve(results);
            }
        });
    });

    return deferred.promise;
};

