(function(jq) {
	var appUtilities = ['$http', function($http) {
		var resolveAppStatus = function(statusId) {
			switch (statusId) {
				case 1:
					return 'Submitted';
				case 2:
					return 'Approved';
				case 3:
					return 'Completed';
				case 4:
					return 'Finalized';
				case 5:
					return 'Rejected';
				default:
					return 'Not-Submitted';
			}
		};

		var resolveAppStatusMessage = function(statusId) {
			switch (statusId) {
				case 1:
					return 'Your Application is Pending Approval';
				case 2:
					return 'Your Application Has Been Approved!';
				case 3:
					return 'Your Application Has Been Completed!';
				case 4:
					return 'Your Application Has Been Finalized!';
				case 5:
					return 'Your Application Has Been Rejected, Here \
						    Are Some Things Your Can Do To Resolve This...';
				default:
					return 'Sorry There Is No Record Of This Application';
			}
		};

		var makeDateTimePicker = function(elemClass) {
			jq("." + elemClass + "").datetimepicker();
		};

		var makeDatePicker = function(elemClass) {
			jq("." + elemClass + "").datepicker();
		};

		var makeDatePickerElem = function(elem) {
			elem.datetimepicker();
			//elem.datepicker();
		};

		var validateCurrency = function(money) {
			var regex  = /^\d+(?:\.\d{0,2})$/;
			if (regex.test(money))
			    return true;
			return false;
		}

		var makeCurrency = function(amt) {
			return '$' + amt;
		}

		var getUrlSegmentFromEnd = function(path, segmentIndex) {
			return path.split('/').slice(segmentIndex)[0];
		}

		return {
			resolveAppStatus        : resolveAppStatus,
			resolveAppStatusMessage : resolveAppStatusMessage,
			makeDatePicker 		    : makeDatePicker,
			makeDatePickerElem 		: makeDatePickerElem,
			validateCurrency 		: validateCurrency,
			makeCurrency 			: makeCurrency,
			getUrlSegmentFromEnd 	: getUrlSegmentFromEnd,
			makeDateTimePicker      : makeDateTimePicker
		};
	}];

	var module = angular.module('MyApp');
	module.factory('appUtilities', appUtilities);
}(jQuery));