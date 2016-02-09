(function() {
	var dataAccess = ['$http', function($http) {
		var getAllApplications = function() {
			return $http.get('../api/applications')
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error retrieving applications: ' + err.data);
						});
		};

		var getApplicationsByStatus = function(status) {
			return $http.get('../api/applications/' + status)
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error retrieving applications: ' + err.data);
						});
		};

		return {
			getAllApplications: getAllApplications,
			getApplicationsByStatus: getApplicationsByStatus
		}
	}];

	var module = angular.module('MyApp.Dashboard');
	module.factory('dataAccess', dataAccess);
}());