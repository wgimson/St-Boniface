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
			return $http.get('../api/applications/status/' + status)
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error retrieving applications: ' + err.data);
						});
		};

		var getApplicationsStatusById = function(id) {
			return $http.get('../api/applications/status/id/' + id)
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error retrieving application status: ' + err.data);
						});
		};

		var getApplicationById = function(appId) {
			return $http.get('../api/applications/id/' + appId)
						.then(function(response) {
							var unformattedDate = response.RequestDate;
							return response.data;
						}, function(err) {
							console.log('Error retrieving application by ID: ' + err.data);
						});
		}

		var login = function(email, pass) {
			return $http.post('../api/user', { email: email, password: pass })
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error logging user in: ' + err.data);
						});
		}

		return {
			getAllApplications: getAllApplications,
			getApplicationsByStatus: getApplicationsByStatus,
			getApplicationById: getApplicationById,
			login: login
		}
	}];

	var module = angular.module('MyApp.Dashboard');
	module.factory('dataAccess', dataAccess);
}());