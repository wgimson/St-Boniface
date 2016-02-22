'use strict';

angular.module('MyApp.LogIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/LogIn', {
    templateUrl: 'log-in/log-in.html',
    controller: 'LogInCtrl'
  });
}])

.controller('LogInCtrl', ['$scope', '$location', 'dataAccess', 'userSession', function($scope, $location, dataAccess, userSession) {
	$scope.login = function() {
		var email = $scope.email,
		pass = $scope.password;
		dataAccess.login(email, pass) 
			      .then(function(loginObj) {
			      	if (loginObj) {
			      		userSession.setUserLoginInfo(loginObj);
			      		if (loginObj.IsAdmin) {
							$location.url('Dashboard/Submitted');
			      		} else {
			      			$location.url('FormView/' + loginObj.FormKey);
			      		}
			      	}
			      	else {
						$location.url('NewForm');
			      	}
			      }, function(err) {
			      	console.log('Could not retrieve applicant login: ' + err);
			      });
	};
}]);