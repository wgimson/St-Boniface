(function() {
	function navBarDirective() {
		return {
			restrict: 'EA',
			templateUrl: '../partials/nav-bar.html',
			replace: true
		}
	}

	var app = angular.module('MyApp')
	app.directive('navBar', navBarDirective);
}());