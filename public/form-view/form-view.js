'use strict';

angular.module('MyApp.FormView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/FormView/:AppId', {
  	templateUrl: 'form-view/form-view.html',
  	controller: 'FormViewCtrl'
  }),
  $routeProvider.when('/FormView/:AppId/Status/:status', {
  	templateUrl: 'form-view/form-view.html',
  	controller: 'FormViewCtrl'
  });
}])

.controller('FormViewCtrl', ['$scope', '$routeParams', 'dataAccess', 'dataFormatter', 'userSession', function($scope, $routeParams, dataAccess, dataFormatter, userSession) {
	// PRIVATE
	var appId = $routeParams.AppId;

	function checkIsAdmin(isAdmin) {
		if (isAdmin) {
			$scope.isAdmin = true;
		}
	}

	// PUBLIC
	$scope.uname = 'User',
	$scope.status = $routeParams.status;

	$scope.viewApplication = function(appId) {
		dataAccess.getApplicationById(appId) 	
			  .then(function(application) {
			  	var user = userSession.getUserSession();
			  	application.RequestDate = dataFormatter.formatDate(application.RequestDate);
			  	//$scope.welcomeUserBack(user);
			  	$scope.isAdmin = user.IsAdmin;
			  	$scope.status = application.AppStatus;
			  	$scope.uname = user.UserName;
			  	$scope.viewApp = application;
			  }, function(error) {
			  	console.log('Could not retrieve application by id: ' + error);
			  });
	}

	$scope.welcomeUserBack = function(user) {
		if (user.UserName) 
			$scope.unameSet = true;
		else 
			$scope.unameSet = false;
	}

	$scope.viewApplication(appId);
}]);