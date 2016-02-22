(function() {
	function submitSuccessMsg() {
		return {
			restrict: 'EA',
			templateUrl: '../partials/submit-success-msg.html',
			replace: true,
			scope: {
				displaySuccessMsg: '=',
				msg: '@'
			},
			link: function() {
				console.log('debug check');
			}
		}
	}

	var app = angular.module('MyApp')
	app.directive('submitSuccessMsg', submitSuccessMsg);
}());