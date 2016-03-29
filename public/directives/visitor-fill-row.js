(function(jq) {
	var visitorFillRow = [function visitorRow() {
		//var rowCount = 0;

		/*var makeRowDatePickers = function(parent) {
			var arrive = parent.find('.arrivalDateAndTime');
			arrive.attr('id', 'arrivalDateTime' + rowCount);
			var depart = parent.find('.departureDateAndTime');
			depart.attr('id', 'departureDateAndTime' + rowCount);
			appUtilities.makeDatePickerElem(arrive);
			appUtilities.makeDatePickerElem(depart);
		};*/

		return {
			restrict: 'EA',
			templateUrl: '../partials/visitor-fill-row.html',
			replace: true,
			link: function(scope, element, attrs) {
				//makeRowDatePickers(element);
				//rowCount++;
				visitor = '@'
			}
		}
	}];

	var app = angular.module('MyApp')
	app.directive('visitorFillRow', visitorFillRow);
}(jQuery));