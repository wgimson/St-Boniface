'use strict';

angular.module('MyApp.LogIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/LogIn', {
    templateUrl: 'log-in/log-in.html',
    controller: 'LogInCtrl'
  });
}])

.controller('LogInCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.login = function() {
		$location.url('NewForm');
	};
}]);