(function() {
	function register() {
		return {
			restrict: 'EA',
			templateUrl: '../partials/register.html',
			replace: true
		}
	}

	var app = angular.module('MyApp')
	app.directive('register', register);
}());