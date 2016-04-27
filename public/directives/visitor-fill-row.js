(function(jq) {
	var visitorFillRow = ['dataFormatter', function visitorRow(dataFormatter) {
		//var rowCount = 0;

		/*var makeRowDatePickers = function(parent) {
			var arrive = parent.find('.arrivalDateAndTime');
			arrive.attr('id', 'arrivalDateTime' + rowCount);
			var depart = parent.find('.departureDateAndTime');
			depart.attr('id', 'departureDateAndTime' + rowCount);
			appUtilities.makeDatePickerElem(arrive);
			appUtilities.makeDatePickerElem(depart);
		};*/
		var dir = this;
		dir.dateFields = ['arrivalDateAndTime', 'departureDateAndTime'];

		function formatDateTimes(elem, visitor) {
			dir.dateFields.forEach(function(field) {
				jq(elem)
					.find("." + field)
					.each(function(index) {
						var $this = jq(this);
						var unformattedDate = field === 'arrivalDateAndTime' ? visitor.arrivalDate : visitor.departureDate;
						$this.val(dataFormatter.formatDateTime(unformattedDate));
					});
			});
		}

		return {
			restrict: 'EA',
			templateUrl: '../partials/visitor-fill-row.html',
			replace: true,
			link: function(scope, element, attrs) {
				//makeRowDatePickers(element);
				//rowCount++;
				var curVisitor = scope.visitor;
				formatDateTimes(element, curVisitor);
				visitor = '@'
			}
		}
	}];

	var app = angular.module('MyApp')
	app.directive('visitorFillRow', visitorFillRow);
}(jQuery));