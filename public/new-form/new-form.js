'use strict';

angular.module('MyApp.NewForm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/NewForm', {
    templateUrl: 'new-form/new-form.html',
    controller: 'NewFormCtrl'
  });
}])

.controller('NewFormCtrl', ['$scope', function($scope) {
	// PRIVATE 
	function getFormVals() {

	}



	// PUBLIC 
	$scope.Visitors = 1;

	$scope.getVisitors = function() {
		return new Array($scope.visitors);
	}

	$scope.addVisitor = function() {
		$scope.visitors++;
	}

	$scope.submitForApproval = function() {
		var frm = {
			FirstName: $scope.FirstName,
			LastName: $scope.LastName,
			RequestDate: $scope.RequestDate,
			CellPhone: $scope.CellPhone,
			Email: $scope.Email,
			Purpose: $scope.Purpose,
			NumberInTrip: $scope.Visitors,
			AppStatus: 1
		}

		return frm;
	}
}]);