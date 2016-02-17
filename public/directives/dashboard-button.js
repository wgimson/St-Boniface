(function() {
	function dashboardButtonDirective() {
		// PRIVATE
		function getAdminAction(appStatus) {
			switch (appStatus) {
				case 'Submitted':
					return {
						text: 'Approve',
						displayButton: true
					};
				case 'Approved': 
					return {
						text: '',
						displayButton: false
					};
				case 'Completed': 
					return {
						text: 'Finalize',
						displayButton: true
					};
				case 'Finalized':
					return {
						text: '',
						displayButton: false
					};
				case 'Rejected':
					return {
						text: '',
						displayButton: false
					};
			}
		}

		// PUBLIC
		return {
			restrict: 'EA',
			templateUrl: '../partials/dashboard-button.html',
			replace: true,
			scope: {
				status: '@'
			},
			link: function(scope, element, attrs) {
				var adminAction = getAdminAction(scope.status);
				scope.actionButtonText = adminAction.text;
				scope.displayActionButton = adminAction.displayButton;
			}
		}
	}

	var app = angular.module('MyApp')
	app.directive('dashboardButton', dashboardButtonDirective);
}());