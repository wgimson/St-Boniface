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
							return response.data.AppStatus;
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

		var submitApplication = function(application) {
			return $http.post('../api/applications/submit', application)
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error approving application: ' + err.data);
						});
		}

		var approveApplication = function(appId) {
			return $http.post('../api/applications/approve/id/' + appId)
						.then(function(response) {
							return response.data.newStatus;
						}, function(err) {
							console.log('Error approving application: ' + err.data);
						});
		}

		var rejectApplication = function(appId) {
			return $http.post('../api/applications/reject/id/' + id)
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error rejecting application: ' + err.data);
						});
		};

		var completeApplication = function(appId, extendedFrm) {
			return $http.post('../api/applications/complete/id/' + appId, extendedFrm)
						.then(function(response) {
							return response.data.newStatus;
						}, function(err) {
							console.log('Error rejecting application: ' + err.data);
						});
					};

		var finalizeApplication = function(appId) {
			return $http.post('../api/applications/finalize/id/' + appId)
						.then(function(response) {
							return response.data.newStatus;
						}, function(err) {
							console.log('Error finalizing application: ' + err.data);
						});
		};

		var registerUser = function(user) {
			return $http.post('../api/user/register', user)
						.then(function(response) {
							return response.data;
						}, function(err) {
							console.log('Error registering user: ' + err.data);
						});
		};

		return {
			getAllApplications:        getAllApplications,
			getApplicationsByStatus:   getApplicationsByStatus,
			getApplicationById:        getApplicationById,
			login: 					   login,
			approveApplication: 	   approveApplication,
			submitApplication: 		   submitApplication,
			registerUser: 			   registerUser,
			getApplicationsStatusById: getApplicationsStatusById,
			completeApplication: 	   completeApplication,
			finalizeApplication:       finalizeApplication
		};
	}];

	var module = angular.module('MyApp.Dashboard');
	module.factory('dataAccess', dataAccess);
}());