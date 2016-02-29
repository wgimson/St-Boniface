(function() {
	var messageModal = ['$location', function ($location) {
		return {
			restrict: 'EA',
			templateUrl: '../partials/message-modal.html',
			replace: true,
			link: function(scope, element, attrs) {
				// PRIVATE
				jQuery('.modal').on('hidden.bs.modal', function (e) {
				  // TODO - figure out why this doesn't work
				  //$location.url('LogIn');
				  window.location.hash = '#/LogIn';
				});

				// PUBLIC API
				scope.displayModal = function() {
					jQuery('.modal').modal();
				};

				scope.returnToHome = function() {
					jQuery('.modal').modal('hide');
				};
			}
		}
	}]

	var app = angular.module('MyApp')
	app.directive('messageModal', messageModal);
}());