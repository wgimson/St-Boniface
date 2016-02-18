(function() {
	var dashboardButtonDirective = ['dataAccess', function(dataAccess) {
		// PRIVATE
		var applicationId;

		function getAdminAction(appStatus) {
			switch (appStatus) {
				case 'Submitted':
					return {
						text: 'Approve',
						displayButton: true,
						displayRejectButton: true,
						approveFunction: approveApplication,
						rejectFunction: rejectApplication
					};
				case 'Approved': 
					return {
						text: '',
						displayButton: false,
						displayRejectButton: false,
						approveFunction: '',
						rejectFunction: ''
					};
				case 'Completed': 
					return {
						text: 'Finalize',
						displayButton: true,
						displayRejectButton: false,
						approveFunction: finalizeApplication,
						rejectFunction: ''
					};
				case 'Finalized':
					return {
						text: '',
						displayButton: false,
						displayRejectButton: false,
						approveFunction: '',
						rejectFunction: ''
					};
				case 'Rejected':
					return {
						text: '',
						displayButton: false,
						displayRejectButton: false,
						approveFunction: '',
						rejectFunction: ''
					};
			}
		}

		function approveApplication() {
			dataAccess.approveApplication(applicationId)
				      .then(function(reponse) {
				      	console.log('app approved');
				      }, function(err) {
				      	console.log('error');
				      });
		}

		function rejectApplication() {
			alert('rejected for: ' + applicationId)
		}

		function finalizeApplication() {
			alert('finalized for: ' + applicationId)
		}

		// PUBLIC
		return {
			restrict: 'EA',
			templateUrl: '../partials/dashboard-button.html',
			replace: true,
			scope: {
				status: '@',
				appId: '@'
			},
			link: function(scope, element, attrs) {
				var adminAction = getAdminAction(scope.status);
				scope.actionButtonText = adminAction.text;
				scope.displayActionButton = adminAction.displayButton;
				scope.displayRejectButton = adminAction.displayRejectButton;
				scope.approveFunction = adminAction.approveFunction;
				scope.rejectFunction = adminAction.rejectFunction;
				applicationId = scope.appId;
			}
		}
	}];

	var app = angular.module('MyApp')
	app.directive('dashboardButton', dashboardButtonDirective);
}());