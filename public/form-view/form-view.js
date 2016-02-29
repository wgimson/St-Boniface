(function() {
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
		var userInfo;

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
				      }, function(err) {
				      	console.log('error');
				      });
		}

		function rejectApplication() {
			alert('rejected for: ' + $scope.appId)
		}

		function finalizeApplication() {
			alert('finalized for: ' + $scope.appId)
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
			alert('Application completed for: ' + $scope.appId);
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

		// PUBLIC
		$scope.uname = 'User',
		$scope.status = $routeParams.status;
		$scope.appId = $routeParams.AppId;
		$scope.isAdmin = userSession.isAdmin();
		$scope.displayFrmStatus = true;

		$scope.viewApplication = function(appId) {
			dataAccess.getApplicationById(appId) 	
				  .then(function(application) {
				  	$scope.frmStatus = appUtilities.resolveAppStatusMessage(application.AppStatus);
				  	var user = userSession.getUserSession();
				  	application.RequestDate = dataFormatter.formatDate(application.RequestDate);
				  	$scope.status = application.AppStatus;
				  	$scope.uname = user.UserName;
				  	$scope.viewApp = application;
					setButtonScope($scope.status);
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

		userInfo = userSession.getUserSession();
		$scope.viewApplication($scope.appId);
	}]);
}());
