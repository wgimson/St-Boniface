(function() {
	var appUtilities = function() {
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
		}

		return {
			resolveAppStatus: resolveAppStatus
		};
	};

	var module = angular.module('MyApp');
	module.factory('appUtilities', appUtilities);
}());