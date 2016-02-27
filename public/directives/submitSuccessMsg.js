(function() {
	function submitSuccessMsg() {
		return {
			restrict: 'EA',
			templateUrl: '../partials/submit-success-msg.html',
			replace: true,
			scope: {
				displaySuccessMsg: '=',
				msg: '@'
			}
		}
	}

	var app = angular.module('MyApp')
	app.directive('submitSuccessMsg', submitSuccessMsg);
}());