'use strict';

angular.module('MyApp.Dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Dashboard/:DashboardTab', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
}])

.controller('DashboardCtrl', ['$scope', '$routeParams', 'dataAccess', 'dataFormatter', function($scope, $routeParams, dataAccess, dataFormatter) {
	var init = function() {
		var status = $routeParams.DashboardTab;
		$scope.getApplicationsByStatus(status)
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

	$scope.getAllApplications = function () {
		dataAccess.getAllApplications()
			 	  .then(function(applications) {
			 	  	$scope.applications = applications;
			 	  }, function(error) {
			 	  	console.log('Could not retrieve applications: ' + error);
			 	  });
	};

	$scope.getApplicationsByStatus = function(status) {
		dataAccess.getApplicationsByStatus(status)
				  .then(function(applications) {
				  	applications.forEach(function(application) {
					  	application.RequestDate = dataFormatter.formatDate(application.RequestDate);
					  	$scope.applications = [];
				  		$scope.applications.push(application);
				  	});
				  }, function(error) {
				  	console.log('Could not retrieve submitted applications: ' + error);
				  });

		setHeadingAndDescription(status);
	}

	$scope.goToApplication = function(appId) {
		window.location = '#/FormView/' + appId;
	};


	init();
}]);