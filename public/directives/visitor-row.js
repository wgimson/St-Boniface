(function(jq) {
	var visitorRow = ['appUtilities', function visitorRow(appUtilities) {
		var rowCount = 0;

		var makeRowDatePickers = function(parent) {
			var arrive = parent.find('.arrivalDateAndTime');
			arrive.attr('id', 'arrivalDateTime' + rowCount);
			var depart = parent.find('.departureDateAndTime');
			depart.attr('id', 'departureDateAndTime' + rowCount);
			appUtilities.makeDatePickerElem(arrive);
			appUtilities.makeDatePickerElem(depart);
		};

		return {
			restrict: 'EA',
			templateUrl: '../partials/visitor-row.html',
			replace: true,
			link: function(scope, element, attrs) {
				makeRowDatePickers(element);
				rowCount++;
			}
		}
	}];

	var app = angular.module('MyApp')
	app.directive('visitorRow', visitorRow);
}(jQuery));