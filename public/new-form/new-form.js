'use strict';

angular.module('MyApp.NewForm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/NewForm', {
    templateUrl: 'new-form/new-form.html',
    controller: 'NewFormCtrl'
  });
}])

.controller('NewFormCtrl', ['$scope', function($scope) {
	$scope.visitors = 1;
	
	$scope.getVisitors = function() {
		return new Array($scope.visitors);
	}

	$scope.addVisitor = function() {
		$scope.visitors++;
	}
}]);