'use strict';

angular.module('MyApp.FormView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/FormView/:AppId', {
  	templateUrl: 'form-view/form-view.html',
  	controller: 'FormViewCtrl'
  });
}])

.controller('FormViewCtrl', ['$scope', '$routeParams', 'dataAccess', 'dataFormatter', function($scope, $routeParams, dataAccess, dataFormatter) {
	var appId = $routeParams.AppId;

	$scope.viewApplication = function(appId) {
		dataAccess.getApplicationById(appId) 	
			  .then(function(application) {
			  	application.RequestDate = dataFormatter.formatDate(application.RequestDate);
			  	$scope.viewApp = application;
			  }, function(error) {
			  	console.log('Could not retrieve application by id: ' + error);
			  });
	}

	$scope.viewApplication(appId);
}]);