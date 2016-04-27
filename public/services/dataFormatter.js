(function() {
	var dataFormatter = function() {
		var formatDate = function(date) {
			var unformattedDate = new Date(date);
		  	return ((unformattedDate.getMonth() + 1) + '/' + unformattedDate.getDate() + '/' + unformattedDate.getFullYear());
		};

		var formatPhoneNumber = function(rawNumber) {
			
		}

		return {
			formatDate: formatDate
		};
	};

	var module = angular.module('MyApp.Dashboard');
	module.factory('dataFormatter', dataFormatter);
}());