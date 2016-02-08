'use strict';

angular.module('MyApp.Dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Dashboard/Submitted', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .when('/Dashboard/Approved', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .when('/Dashboard/Completed', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .when('/Dashboard/Finalized', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', 'dataAccess', function($scope, dataAccess) {
	$scope.message = "This is the dashboard";

	$scope.getApplications = function () {
		dataAccess.getApplications()
			 	  .then(function(applications) {
			 	  	$scope.applications = applications;
			 	  }, function(error) {
			 	  	console.log('Could not retrieve applications: ' + error);
			 	  });
	};

	$scope.getApplications();
}]);