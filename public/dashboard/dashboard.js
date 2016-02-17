'use strict';

angular.module('MyApp.Dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Dashboard/:DashboardTab', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
}])

.controller('DashboardCtrl', ['$scope', '$routeParams', 'dataAccess', 'dataFormatter', 'userSession', function($scope, $routeParams, dataAccess, dataFormatter, userSession) {
	// PRIVATE
	var init = function() {
		$scope.status = $routeParams.DashboardTab;
		$scope.getApplicationsByStatus($scope.status)
	}

	var setHeadingAndDescription = function(status) {
		switch (status) {
			case 'Submitted':
				$scope.heading = 'Submitted Applications';
				$scope.description = 'These are submitted...';
				break;
			case 'Completed':
				$scope.heading = 'Completed Applications';
				$scope.description = 'These are Completed...';
				break;
			case 'Approved':
				$scope.heading = 'Approved Applications';
				$scope.description = 'These are Approved...';
				break;
			case 'Finalized':
				$scope.heading = 'Finalized Applications';
				$scope.description = 'These are Finalized...';
				break;
			case 'Rejected':
				$scope.heading = 'Rejected Applications';
				$scope.description = 'These are Rejected...';
				break;
		}
	}


	// PUBLIC
	$scope.isAdmin = false;
	$scope.appCount = 0;

	$scope.getAllApplications = function () {
		dataAccess.getAllApplications()
			 	  .then(function(applications) {
			 	  	$scope.applications = applications;
			 	  	$scope.appCount = $scope.applications.length;
			 	  }, function(error) {
			 	  	console.log('Could not retrieve applications: ' + error);
			 	  });
	};

	$scope.getApplicationsByStatus = function(status) {
		dataAccess.getApplicationsByStatus(status)
				  .then(function(applications) {
				  	var user = userSession.getUserSession();
				  	$scope.isAdmin = user.IsAdmin;
				  	applications.forEach(function(application) {
					  	application.RequestDate = dataFormatter.formatDate(application.RequestDate);
					  	$scope.applications = [];
				  		$scope.applications.push(application);
				  		$scope.appCount++;
				  	});
				  }, function(error) {
				  	console.log('Could not retrieve submitted applications: ' + error);
				  });

		setHeadingAndDescription(status);
	}

	$scope.goToApplication = function(appId) {
		window.location = '#/FormView/' + appId + '/Status/' + $scope.status;
	};


	init();
}]);