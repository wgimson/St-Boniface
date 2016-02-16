(function() {
	function welcomeDirective() {
		return {
			restrict: 'EA',
			templateUrl: '../partials/welcome.html',
			replace: true,
			scope: {
				uname: '@'
			}
		}
	}

	var app = angular.module('MyApp')
	app.directive('welcome', welcomeDirective);
}());