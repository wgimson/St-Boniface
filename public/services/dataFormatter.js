(function() {
	var dataFormatter = function() {
		var formatDate = function(date) {
			var unformattedDate = new Date(date);
		  	return ((unformattedDate.getMonth() + 1) + '/' + unformattedDate.getDate() + '/' + unformattedDate.getFullYear());
		};

		var formatDateTime = function(date) {
			var unformattedDate = new Date(date);
			var hours = unformattedDate.getHours();
			var minutes = unformattedDate.getMinutes();
			var ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;
		  	return ((unformattedDate.getMonth() + 1) + '/' + unformattedDate.getDate() + '/' + unformattedDate.getFullYear() + " - " + strTime);
		};

		var formatPhoneNumber = function(rawNumber) {
			
		}

		return {
			formatDate     : formatDate,
			formatDateTime : formatDateTime
		};
	};

	var module = angular.module('MyApp.Dashboard');
	module.factory('dataFormatter', dataFormatter);
}());