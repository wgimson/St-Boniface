(function() {
	var dataAccess = ['$http', function($http) {
		var getApplications = function() {
			return $http.get('../api/applications')
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error retrieving applications: ' + err.data);
						});
		};

		return {
			getApplications: getApplications
		}
	}];

	var module = angular.module('MyApp.Dashboard');
	module.factory('dataAccess', dataAccess);
}());