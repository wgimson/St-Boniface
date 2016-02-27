(function() {
	'use strict';

	angular.module('MyApp.NewForm', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/NewForm', {
	    templateUrl: 'new-form/new-form.html',
	    controller: 'NewFormCtrl'
	  });
	}])

	.controller('NewFormCtrl', ['$scope', 'dataAccess', 'userSession', function($scope, dataAccess, userSession) {
		// PRIVATE 

		// PUBLIC 
		$scope.Visitors = 1,
		$scope.displaySuccessMsg = false,
		$scope.successMsg = '',
		$scope.displayRegisterPartial = false,
		$scope.formKey = '',
		$scope.hideForm= false;
		$scope.displayRegisteredModal = false;

		$scope.getVisitors = function() {
			return new Array($scope.visitors);
		}

		$scope.addVisitor = function() {
			$scope.visitors++;
		}

		$scope.registerNewUser = function() {
			var newUser = JSON.stringify({
				UName: $scope.email,
				Email: $scope.email,
				Password: $scope.password,
				FormKey: $scope.formKey
			});

			if ($scope.password === $scope.passwordConfirm) 
				dataAccess.registerUser(newUser)
						  .then(function(user) {
						  	userSession.setUserLoginInfo(user);
						  	$scope.successMsg = 'You Have Successfully Registered!';
						  	$scope.displaySuccessMsg = true;
						  	$scope.displayRegisterPartial = false;
						  	$scope.modalTitle = 'REGISTRATION';
						  	$scope.modalMessage = 'You Have Successfully Registered';
						  	$scope.displayRegisteredModal = true;
						  	$scope.displayModal();
						  }, function(err) {
						  	console.log('front end error registering user: ' + err);
						  });
			else 
				alert('passwords must match');
		}

		$scope.submitForApproval = function() {
			var frm = JSON.stringify({
				FirstName: $scope.FirstName,
				LastName: $scope.LastName,
				RequestDate: $scope.RequestDate,
				CellPhone: $scope.CellPhone,
				Email: $scope.Email,
				Purpose: $scope.Purpose,
				NumberInTrip: $scope.Visitors,
				AppStatus: 1
			});

			dataAccess.submitApplication(frm)
					 .then(function(data) {
					 	$scope.formKey = data._id; 
					 	$scope.hideForm = true;
					 	$scope.displayRegisterPartial = true;
					 	$scope.displaySuccessMsg = true;
					 	$scope.successMsg = "You're form has been submitted to the Administrator \
					 					     for approval! Now please register, if you don't you \
					 					     	won't be able to check back with your form!"
					 }, function(err) {
					 	console.log('Front end error submitting form: ' + err);
					 });

			return frm;
		}
	}]);
}());
