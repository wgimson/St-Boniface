(function() {
	var dashboardButtonDirective = ['dataAccess', function(dataAccess) {
		// PRIVATE

		// PUBLIC
		return {
			restrict: 'EA',
			templateUrl: '../partials/dashboard-button.html',
			replace: true,
			scope: {
				affirmButtonTxt: '@',
				denyButtonTxt: '@',
				displayAffirmButton: '=',
				displayDenyButton: '=',
				affirmFunc: '&',
				denyFunc: '&',
				appId: '@'
			},
			link: function(scope, element, attrs) {
				console.log('hi');
			}
		}
	}];

	var app = angular.module('MyApp')
	app.directive('dashboardButton', dashboardButtonDirective);
}());