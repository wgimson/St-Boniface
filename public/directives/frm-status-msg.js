(function() {
	function frmStatusMsg() {
		return {
			restrict: 'EA',
			templateUrl: '../partials/frm-status-msg.html',
			replace: true
		}
	}

	var app = angular.module('MyApp')
	app.directive('frmStatusMsg', frmStatusMsg);
}());