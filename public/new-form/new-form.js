(function(jq) {
	'use strict';

	angular.module('MyApp.NewForm', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/NewForm', {
	    templateUrl: 'new-form/new-form.html',
	    controller: 'NewFormCtrl'
	  });
	}])

	.controller('NewFormCtrl', ['$scope', 'dataAccess', 'userSession', 'appUtilities', function($scope, dataAccess, userSession, appUtilities) {
		// PRIVATE 
		var ctrl = this;
		ctrl.datePickerElems = ['requestDate'/*Add date fields here*/];
		ctrl.dateTimePickerElems = [/*Add date fields here*/];

		function makeDatePickers() {
			ctrl.datePickerElems.forEach(function(elemClass) {
				appUtilities.makeDatePicker(elemClass);
			});
		}

		function makeDateTimePickers() {
			ctrl.dateTimePickerElems.forEach(function(elemClass) {
				appUtilities.makeDateTimePicker(elemClass);
			});
		}
		
		function init() {
			makeDatePickers();
			makeDateTimePickers();
		}

		function getFrmVisitors() {
			var formVisitors = [];
			jq('.divVisitor').each(function(index) {
				var jqThis = jq(this);
				var name = jqThis.find('[id^="groupMembers"]').val(),
				    arrivalDate = jqThis.find('[id^="arrivalDateTime"]').val(),
				    departureDate = jqThis.find('[id^="departureDateAndTime"]').val(),
				    maleOrFemale = jqThis.find('input[name^="radioGender"]:checked').val();
				var visitor = {
					name: name, 
					arrivalDate: arrivalDate,
					departureDate: departureDate,
					maleOrFemale: maleOrFemale
				};
				formVisitors.push(visitor);
			}); 
			return formVisitors;
		}

		// PUBLIC 
		$scope.visitors = 1,
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
			//makeDatePickers();
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
				MiddleInitial: $scope.MInitial,
				RequestDate: $scope.RequestDate,
				Title: $scope.Title,
				Occupation: $scope.Occupation,
				CellPhone: $scope.CellPhone,
				Email: $scope.Email,
				Purpose: $scope.Purpose,
				PaidFor: $scope.PaidFor,
				FirstTime: $scope.FirstTime,
				NumberInTrip: $scope.Visitors,
				Sponsor: $scope.Sponsor,
				Visitors: getFrmVisitors(),
				SponsorInHaiti: $scope.SponsorInHaiti,
				SponsorCell: $scope.SponsorCell,
				SponsorRelationship: $scope.SponsorRelationship,
				Requested: $scope.Requested,
				AirTransport: $scope.AirTransport,
				SpecialRoutingInfo: $scope.SpecialRoutingInfo,
				AirfareExpense: $scope.AirfareExpense,
				GroundExpense: $scope.GroundExpense,
				EvacExpense: $scope.EvacExpense,
				OtherExpense: $scope.OtherExpense,
				FrenchSpeaking: $scope.FrenchSpeaking,
				VisitorWillStay: $scope.VisitorWillStay,
				BookedByNewton: $scope.BookedByNewton,
				DirectExpense: $scope.DirectExpense,
				ReimbursableExpense: $scope.ReimbursableExpense,
				TypeOfVisit: $scope.VisitType,
				Fees: $scope.Fees,
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

		init();
	}]);
}(jQuery));
