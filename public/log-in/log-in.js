'use strict';

angular.module('MyApp.LogIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/LogIn', {
    templateUrl: 'log-in/log-in.html',
    controller: 'LogInCtrl'
  });
}])

.controller('LogInCtrl', ['$scope', '$location', 'dataAccess', function($scope, $location, dataAccess) {
	$scope.login = function() {
		var email = $scope.email,
		pass = $scope.password;
		dataAccess.login(email, pass) 
			      .then(function(loginObj) {
			      	if (loginObj) {
			      		var formId = loginObj.FormKey,
			      		uname = loginObj.UName;
			      		$location.url('FormView/' + formId + '?uname=' + uname);
			      	}
			      	else {
						$location.url('NewForm');
			      	}
			      }, function(err) {
			      	console.log('Could not retrieve applicant login: ' + error);
			      });
	};
}]);