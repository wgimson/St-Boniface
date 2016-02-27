(function() {
	var messageModal = ['$location', function ($location) {
		return {
			restrict: 'EA',
			templateUrl: '../partials/message-modal.html',
			replace: true,
			link: function(scope, element, attrs) {

				// PUBLIC API
				scope.displayModal = function() {
					jQuery('.modal').modal();
				};

				scope.returnToHome = function() {
					jQuery('.modal').modal('hide');
					$location.url('LogIn');
				};
			}
		}
	}]

	var app = angular.module('MyApp')
	app.directive('messageModal', messageModal);
}());