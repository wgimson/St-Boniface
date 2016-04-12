(function(jq) {
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

	.controller('FormViewCtrl', ['$scope', '$routeParams', 'dataAccess', 'dataFormatter', 'userSession', 'appUtilities', function($scope, $routeParams, dataAccess, dataFormatter, userSession, appUtilities) {
		// PRIVATE
		var ctrl = this;
		var userInfo;
		ctrl.datePickerElems = ['requestDate', 'dateOfBirthExt'];

		function makeDatePickers() {
			ctrl.datePickerElems.forEach(function(elem) {
				appUtilities.makeDatePicker(elem);
			});
		}

		function getAdminAction(appStatus) {
			switch (appStatus) {
				case 'Submitted':
					return {
						affirmButtonText: 'Approve',
						rejectButtonText: 'Reject',
						displayButton: true,
						displayRejectButton: true,
						affirmFunction: approveApplication,
						rejectFunction: rejectApplication
					};
				case 'Approved': 
					return {
						affirmButtonText: '',
						rejectButtonText: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: '',
						rejectFunction: ''
					};
				case 'Completed': 
					return {
						affirmButtonText: 'Finalize',
						rejectButtonText: '',
						displayButton: true,
						displayRejectButton: false,
						affirmFunction: finalizeApplication,
						rejectFunction: ''
					};
				case 'Finalized':
					return {
						text: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: '',
						rejectFunction: ''
					};
				case 'Rejected':
					return {
						affirmButtonText: '',
						rejectButtonText: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: '',
						rejectFunction: ''
					};
			}
		}

		function getApplicantAction(appStatus) {
			switch (appStatus) {
				case '':
					return {
						affirmButtonText: 'Submit',
						rejectButtonText: '',
						displayButton: true,
						displayRejectButton: false,
						affirmFunction: submitApplication,
						rejectFunction: null
					};
				case 'Submitted':
					return {
						affirmButtonText: '',
						rejectButtonText: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: null,
						rejectFunction: null
					};
				case 'Approved': 
					return {
						affirmButtonText: 'Complete',
						rejectButtonText: '',
						displayButton: true,
						displayRejectButton: false,
						affirmFunction: completeApplication,
						rejectFunction: null
					};
				case 'Completed':
					return {
						affirmButtonText: '',
						rejectButtonText: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: null,
						rejectFunction: null
					};
				case 'Finalized':
					return {
						text: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: null,
						rejectFunction: null
					};
				case 'Rejected':
					return {
						affirmButtonText: '',
						rejectButtonText: '',
						displayButton: false,
						displayRejectButton: false,
						affirmFunction: null,
						rejectFunction: null
					};
				default: 
					return {
						affirmButtonText: 'Submit',
						rejectButtonText: '',
						displayButton: true,
						displayRejectButton: false,
						affirmFunction: submitApplication,
						rejectFunction: null
					};
			}
		}

		function approveApplication() {
			dataAccess.approveApplication($scope.appId)
				      .then(function(newStatus) {
				      	console.log('app approved');
				      	$scope.frmStatus = appUtilities.resolveAppStatusMessage(newStatus);
				      	init();
				      }, function(err) {
				      	console.log('error');
				      });
		}

		function rejectApplication() {
			alert('rejected for: ' + $scope.appId)
		}

		function finalizeApplication() {
			dataAccess.finalizeApplication($scope.appId)
				      .then(function(newStatus) {
				      	console.log('app finalized');
				      	$scope.frmStatus = appUtilities.resolveAppStatusMessage(newStatus);
				      	init();
				      }, function(err) {
				      	console.log('error');
				      });
		}

		function submitApplication() {
			alert('submit for: ' + $scope.appId)
			/*var appVals = getApplicationValues();
			dataAccess.submitApplication(appVals)
				      .then(function(reponse) {
				      	console.log('app submitted');
				      }, function(err) {
				      	console.log('error');
				      });*/			
		}

		function completeApplication() {
			$scope.readyToComplete = true;
		}

		$scope.submitForCompletion = function() {
			var extendedForm = JSON.stringify({
				DateOfBirth: 		      $scope.viewApp.dateOfBirth,
				Cell: 				      $scope.viewApp.cellPhoneNumber,
				Email: 				      $scope.viewApp.emailAddress,
				EmergencyContact: 	      $scope.viewApp.emergencyContact,
				EmergencyContactCell:     $scope.viewApp.emergencyContactCell,
				PassportNumber: 	      $scope.viewApp.passNumber,
				PassportCountry: 	     ($scope.viewApp.PassportIsUS ? 'US' : $scope.viewApp.passportCountry),
				IsInternationalVisitor:   $scope.viewApp.isInternational,
				HasVisitorHandbook: 	  $scope.viewApp.VisitorHandbook,
				FeesCollectedAtResidence: $scope.viewApp.CollectAtResidence,
				NeedLodging: 			 (typeof($scope.viewApp.NeedLodging) === 'undefined' ? false : true),
				NeedMeals: 				 (typeof($scope.viewApp.NeedMeals) === 'undefined' ? false : true),
				NeedOther: 				 (typeof($scope.viewApp.NeedOther) === 'undefined' ? false : true),
				TripAdded: 				  $scope.viewApp.TripAdded,
				CoordinatorNotified:      $scope.viewApp.CoordinatorNotified,
				MedEvacInsurance: 		  $scope.viewApp.MedEvacInsurance,
				VolunteerWaiver:          $scope.viewApp.VolunteerWaiver,
				AdditionalInfo: 	      $scope.viewApp.AdditionalInfo
			});
			dataAccess.completeApplication($scope.appId, extendedForm)
				.then(function(newStatus) {
					console.log('app completed');
					$scope.frmStatus = appUtilities.resolveAppStatusMessage(newStatus);
					init();
				}, function(err) {
					console.log('error');
				});
		}

		function getApplicationValues() {
			return {
				LastName: $scope.LastName,
				FirstName: $scope.FirstName,
				RequestDate: $scope.RequestDate,
				CellPhone: $scope.CellPhone,
				Email: $scope.Email,
				PurposeOfTrip: $scope.PurposeOfTrip
			}
		}

		function checkIsAdmin(isAdmin) {
			if (isAdmin) {
				$scope.isAdmin = true;
			}
		}

		function setButtonScope(appStatusId) {
			var appStatus = appUtilities.resolveAppStatus(appStatusId);
			var actionObj;
			if ($scope.isAdmin)
				actionObj = getAdminAction(appStatus);
			else 
				actionObj = getApplicantAction(appStatus);
			$scope.affirmButtonTxt = actionObj.affirmButtonText;
			$scope.denyButtonTxt = actionObj.rejectButtonText;
			$scope.displayAffirmButton = actionObj.displayButton;
			$scope.displayDenyButton = actionObj.displayRejectButton;
			$scope.affirmFunc = actionObj.affirmFunction;
			$scope.denyFunc = actionObj.rejectFunction;
		}

		function setExtendedView(appStatusId) {
			var appStatus = appUtilities.resolveAppStatus(appStatusId);
			if (appStatus === 'Completed' || appStatus === 'Finalized')
				return true;
			return false;
		}

		function init() {
			$scope.readyToComplete = false;
			$scope.showPassportCountry = false;
			$scope.uname = 'User',
			$scope.status = $routeParams.status;
			$scope.appId = $routeParams.AppId;
			$scope.isAdmin = userSession.isAdmin();
			$scope.displayFrmStatus = true;
			userInfo = userSession.getUserSession();
			$scope.viewApplication($scope.appId);
			makeDatePickers();
			//$scope.frmStatus = appUtilities.resolveAppStatusMessage(newStatus);
		}

		// PUBLIC
		$scope.viewApplication = function(appId) {
			dataAccess.getApplicationById(appId) 	
				  .then(function(application) {
				  	$scope.frmStatus = appUtilities.resolveAppStatusMessage(application.AppStatus);
				  	var user = userSession.getUserSession();
				  	application.RequestDate = dataFormatter.formatDate(application.RequestDate);
				  	$scope.status = application.AppStatus;
				  	$scope.uname = user.UserName;
				  	$scope.viewApp = application;
				  	$scope.Visitors = application.Visitors;
					setButtonScope($scope.status);
					$scope.displayExtended = setExtendedView($scope.status);
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

		$scope.getVisitors = function(appId) {
			return $scope.Visitors;
		}

		$scope.makeCurrency = function(amt) {
			return appUtilities.makeCurrency(amt);
		}

		$scope.togglePassportCountry = function() {
			if ($scope.viewApp.PassportIsUS) 
				$scope.showPassportCountry = false;
			else 
				$scope.showPassportCountry = true;
		}

		init();
	}]);
}(jQuery));
