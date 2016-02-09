'use strict';

angular.module('MyApp.FormView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/FormView/:AppId', {
  	templateUrl: 'form-view/form-view.html',
  	controller: 'FormViewCtrl'
  });
}])

.controller('FormViewCtrl', ['$scope', '$routeParams', 'dataAccess', function($scope, $routeParams, dataAccess) {
	var appId = $routeParams.AppId;

	$scope.viewApplication = function(appId) {
		dataAccess.getApplicationById(appId) 	
			  .then(function(application) {
			  	$scope.viewApp = application;
			  }, function(error) {
			  	console.log('Could not retrieve application by id: ' + error);
			  });
	}

	$scope.viewApplication(appId);
}]);