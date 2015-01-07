

var emailsGenerator = (function () {
	return {
		generate: generate
	};

	function generate(params) {

		var firstName = String(params.firstName).toLowerCase();
		var lastName = String(params.lastName).toLowerCase();
		var domain = String(params.domain).toLowerCase();
		var results = [];

		if (!domain) return results;

		if (firstName) {
			var firstNameResults = [
				firstName
			];
			var results = results.concat(firstNameResults);
		}

		if (lastName) {
			var lastNameResults = [
				lastName
			];
			var results = results.concat(lastNameResults);

		}

		if (firstName && lastName) {
			var fullNameResults = [
				firstName + lastName,
				firstName + '.' + lastName,
				firstName + '-' + lastName,

				firstName[0] + '.' + lastName,
				firstName[0] + lastName,
				firstName + lastName[0],

				lastName + firstName,
				lastName + '.' + firstName,
				lastName + '-' + firstName,

				lastName[0] + '.' + firstName,
				lastName[0] + firstName,
				lastName + firstName[0],
			];
			var results = results.concat(fullNameResults);
		}
		
		var results = addDomain(results, domain);
		return results;
	};

	function addDomain(data, domain) {
		data.forEach(function(item, i){
			data[i] = item + '@' + domain;
		});

		return data;
	};

})();

module.exports = emailsGenerator;

